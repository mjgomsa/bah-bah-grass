"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventHandler = void 0;
var constants_1 = require("../constants");
var listener_1 = require("../util/listener");
var emitter_1 = require("../util/emitter");
var bulk_subscription_service_1 = require("../util/bulk-subscription-service");
var EventHandler = /** @class */ (function () {
    function EventHandler(services, options, listeners) {
        this.services = services;
        this.emitter = new emitter_1.Emitter();
        this.limboQueue = [];
        this.bulkSubscription = new bulk_subscription_service_1.BulkSubscriptionService(this.services, options.subscriptionInterval, constants_1.TOPIC.EVENT, constants_1.EVENT_ACTION.SUBSCRIBE, constants_1.EVENT_ACTION.UNSUBSCRIBE, this.onBulkSubscriptionSent.bind(this));
        this.listeners = listeners || new listener_1.Listener(constants_1.TOPIC.EVENT, services);
        this.services.connection.registerHandler(constants_1.TOPIC.EVENT, this.handle.bind(this));
        this.services.connection.onExitLimbo(this.onExitLimbo.bind(this));
        this.services.connection.onReestablished(this.onConnectionReestablished.bind(this));
    }
    /**
     * Returns all the events that are subscribed to locally
     */
    EventHandler.prototype.eventNames = function () {
        return this.emitter.eventNames();
    };
    /**
    * Subscribe to an event. This will receive both locally emitted events
    * as well as events emitted by other connected clients.
    */
    EventHandler.prototype.subscribe = function (name, callback) {
        if (typeof name !== 'string' || name.length === 0) {
            throw new Error('invalid argument name');
        }
        if (typeof callback !== 'function') {
            throw new Error('invalid argument callback');
        }
        if (!this.emitter.hasListeners(name)) {
            if (this.services.connection.isConnected) {
                this.bulkSubscription.subscribe(name);
            }
        }
        this.emitter.on(name, callback);
    };
    /**
     * Removes a callback for a specified event. If all callbacks
     * for an event have been removed, the server will be notified
     * that the client is unsubscribed as a listener
     */
    EventHandler.prototype.unsubscribe = function (name, callback) {
        if (!name || typeof name !== 'string' || name.length === 0) {
            throw new Error('invalid argument name');
        }
        if (callback !== undefined && typeof callback !== 'function') {
            throw new Error('invalid argument callback');
        }
        if (!this.emitter.hasListeners(name)) {
            this.services.logger.warn({
                topic: constants_1.TOPIC.EVENT,
                action: constants_1.EVENT_ACTION.NOT_SUBSCRIBED,
                name: name
            });
            return;
        }
        this.emitter.off(name, callback);
        if (!this.emitter.hasListeners(name)) {
            this.bulkSubscription.unsubscribe(name);
        }
    };
    /**
     * Emits an event locally and sends a message to the server to
     * broadcast the event to the other connected clients
     */
    EventHandler.prototype.emit = function (name, data) {
        if (typeof name !== 'string' || name.length === 0) {
            throw new Error('invalid argument name');
        }
        var message = {
            topic: constants_1.TOPIC.EVENT,
            action: constants_1.EVENT_ACTION.EMIT,
            name: name,
            parsedData: data
        };
        if (this.services.connection.isConnected) {
            this.services.connection.sendMessage(message);
        }
        else if (this.services.connection.isInLimbo) {
            this.limboQueue.push(message);
        }
        this.emitter.emit(name, data);
    };
    /**
   * Allows to listen for event subscriptions made by this or other clients. This
   * is useful to create "active" data providers, e.g. providers that only provide
   * data for a particular event if a user is actually interested in it
   */
    EventHandler.prototype.listen = function (pattern, callback) {
        this.listeners.listen(pattern, callback);
    };
    /**
     * Removes a listener that was previously registered
     */
    EventHandler.prototype.unlisten = function (pattern) {
        this.listeners.unlisten(pattern);
    };
    /**
   * Handles incoming messages from the server
   */
    EventHandler.prototype.handle = function (message) {
        if (message.isAck) {
            this.services.timeoutRegistry.remove(message);
            return;
        }
        if (message.action === constants_1.EVENT_ACTION.EMIT) {
            if (message.parsedData !== undefined) {
                this.emitter.emit(message.name, message.parsedData);
            }
            else {
                this.emitter.emit(message.name, undefined);
            }
            return;
        }
        if (message.action === constants_1.EVENT_ACTION.MESSAGE_DENIED) {
            this.services.logger.error({ topic: constants_1.TOPIC.EVENT }, constants_1.EVENT_ACTION.MESSAGE_DENIED);
            this.services.timeoutRegistry.remove(message);
            if (message.originalAction === constants_1.EVENT_ACTION.SUBSCRIBE) {
                this.emitter.off(message.name);
            }
            return;
        }
        if (message.action === constants_1.EVENT_ACTION.MULTIPLE_SUBSCRIPTIONS || message.action === constants_1.EVENT_ACTION.NOT_SUBSCRIBED) {
            this.services.timeoutRegistry.remove(__assign(__assign({}, message), { action: constants_1.EVENT_ACTION.SUBSCRIBE }));
            this.services.logger.warn(message);
            return;
        }
        if (message.action === constants_1.EVENT_ACTION.SUBSCRIPTION_FOR_PATTERN_FOUND ||
            message.action === constants_1.EVENT_ACTION.SUBSCRIPTION_FOR_PATTERN_REMOVED) {
            this.listeners.handle(message);
            return;
        }
        if (message.action === constants_1.EVENT_ACTION.INVALID_LISTEN_REGEX) {
            this.services.logger.error(message);
            return;
        }
        this.services.logger.error(message, constants_1.EVENT.UNSOLICITED_MESSAGE);
    };
    /**
     * Resubscribes to events when connection is lost
     */
    EventHandler.prototype.onConnectionReestablished = function () {
        this.bulkSubscription.subscribeList(this.emitter.eventNames());
        for (var i = 0; i < this.limboQueue.length; i++) {
            this.services.connection.sendMessage(this.limboQueue[i]);
        }
        this.limboQueue = [];
    };
    EventHandler.prototype.onExitLimbo = function () {
        this.limboQueue = [];
    };
    EventHandler.prototype.onBulkSubscriptionSent = function (message) {
        this.services.timeoutRegistry.add({ message: message });
    };
    return EventHandler;
}());
exports.EventHandler = EventHandler;
