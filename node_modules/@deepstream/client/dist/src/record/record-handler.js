"use strict";
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecordHandler = void 0;
var utils = require("../util/utils");
var constants_1 = require("../constants");
var record_core_1 = require("./record-core");
var record_1 = require("./record");
var anonymous_record_1 = require("./anonymous-record");
var list_1 = require("./list");
var listener_1 = require("../util/listener");
var single_notifier_1 = require("./single-notifier");
var write_ack_service_1 = require("./write-ack-service");
var dirty_service_1 = require("./dirty-service");
var merge_strategy_service_1 = require("./merge-strategy-service");
var bulk_subscription_service_1 = require("../util/bulk-subscription-service");
var RecordHandler = /** @class */ (function () {
    function RecordHandler(services, options, recordServices, listener) {
        var _a;
        if (listener === void 0) { listener = new listener_1.Listener(constants_1.TOPIC.RECORD, services); }
        this.services = services;
        this.options = options;
        this.listener = listener;
        this.recordCores = new Map();
        this.notifyCallbacks = new Map();
        this.recordServices = recordServices || {
            bulkSubscriptionService: (_a = {},
                _a[constants_1.RECORD_ACTION.SUBSCRIBECREATEANDREAD] = this.getBulkSubscriptionService(constants_1.RECORD_ACTION.SUBSCRIBECREATEANDREAD),
                _a[constants_1.RECORD_ACTION.SUBSCRIBEANDREAD] = this.getBulkSubscriptionService(constants_1.RECORD_ACTION.SUBSCRIBEANDREAD),
                _a[constants_1.RECORD_ACTION.SUBSCRIBEANDHEAD] = this.getBulkSubscriptionService(constants_1.RECORD_ACTION.SUBSCRIBEANDHEAD),
                _a),
            writeAckService: new write_ack_service_1.WriteAcknowledgementService(services),
            readRegistry: new single_notifier_1.SingleNotifier(services, constants_1.RECORD_ACTION.READ, options.recordReadTimeout),
            headRegistry: new single_notifier_1.SingleNotifier(services, constants_1.RECORD_ACTION.HEAD, options.recordReadTimeout),
            dirtyService: new dirty_service_1.DirtyService(services.storage, options.dirtyStorageName),
            mergeStrategy: new merge_strategy_service_1.MergeStrategyService(services, options.mergeStrategy)
        };
        this.dirtyService = this.recordServices.dirtyService;
        this.sendUpdatedData = this.sendUpdatedData.bind(this);
        this.onMergeCompleted = this.onMergeCompleted.bind(this);
        this.getRecordCore = this.getRecordCore.bind(this);
        this.removeRecord = this.removeRecord.bind(this);
        this.onBulkSubscriptionSent = this.onBulkSubscriptionSent.bind(this);
        this.services.connection.registerHandler(constants_1.TOPIC.RECORD, this.handle.bind(this));
        this.services.connection.onReestablished(this.syncDirtyRecords.bind(this));
        if (this.services.connection.isConnected) {
            this.syncDirtyRecords();
        }
    }
    /**
     * Returns all the available data-sync names.
     *
     * Please note: Lists, AnonymousRecords and Records are all essentially
     * the same thing within the SDK, so this array will contain a list of
     * everything.
     *
     * Due to how records work as well even after a discard this list will
     * take a while to update. This is intentional as their is an option for
     * how long a record will survive before being discarded! You can change that
     * via the `recordDiscardTimeout: milliseconds` option.
     */
    RecordHandler.prototype.names = function () {
        return __spread(this.recordCores.keys());
    };
    RecordHandler.prototype.setMergeStrategy = function (recordName, mergeStrategy) {
        if (typeof mergeStrategy === 'function') {
            this.recordServices.mergeStrategy.setMergeStrategyByName(recordName, mergeStrategy);
        }
        else {
            throw new Error('Invalid merge strategy: Must be a Function');
        }
    };
    RecordHandler.prototype.setMergeStrategyRegExp = function (regexp, mergeStrategy) {
        if (typeof mergeStrategy === 'function') {
            this.recordServices.mergeStrategy.setMergeStrategyByPattern(regexp, mergeStrategy);
        }
        else {
            throw new Error('Invalid merge strategy: Must be a Function');
        }
    };
    /**
   * Returns an existing record or creates a new one.
   *
   * @param   {String} name the unique name of the record
   */
    RecordHandler.prototype.getRecord = function (name) {
        return new record_1.Record(this.getRecordCore(name));
    };
    /**
     * Returns an existing List or creates a new one. A list is a specialised
     * type of record that holds an array of recordNames.
     *
     * @param   {String} name       the unique name of the list
     */
    RecordHandler.prototype.getList = function (name) {
        return new list_1.List(this.getRecordCore(name));
    };
    /**
     * Returns an anonymous record. A anonymous record is effectively
     * a wrapper that mimicks the API of a record, but allows for the
     * underlying record to be swapped without loosing subscriptions etc.
     *
     * This is particularly useful when selecting from a number of similarly
     * structured records. E.g. a list of users that can be choosen from a list
     *
     * The only API difference to a normal record is an additional setName( name ) method.
     */
    RecordHandler.prototype.getAnonymousRecord = function () {
        return new anonymous_record_1.AnonymousRecord(this.getRecordCore);
    };
    /**
     * Allows to listen for record subscriptions made by this or other clients. This
     * is useful to create "active" data providers, e.g. providers that only provide
     * data for a particular record if a user is actually interested in it
     *
     * @param   {String}   pattern  A combination of alpha numeric characters and wildcards( * )
     * @param   {Function} callback
     */
    RecordHandler.prototype.listen = function (pattern, callback) {
        this.listener.listen(pattern, callback);
    };
    /**
     * Removes a listener that was previously registered with listenForSubscriptions
     *
     * @param   {String}   pattern  A combination of alpha numeric characters and wildcards( * )
     */
    RecordHandler.prototype.unlisten = function (pattern) {
        this.listener.unlisten(pattern);
    };
    RecordHandler.prototype.snapshot = function (name, callback) {
        var _this = this;
        if (typeof name !== 'string' || name.length === 0) {
            throw new Error('invalid argument: name');
        }
        if (callback !== undefined && typeof callback !== 'function') {
            throw new Error('invalid argument: callback');
        }
        var recordCore = this.recordCores.get(name);
        if (recordCore) {
            if (callback) {
                recordCore.whenReady(null, function () {
                    callback(null, recordCore.get());
                });
            }
            else {
                return new Promise(function (resolve, reject) {
                    recordCore.whenReady(null, function () {
                        resolve(recordCore.get());
                    });
                });
            }
            return;
        }
        if (callback) {
            this.recordServices.readRegistry.request(name, callback);
        }
        else {
            return new Promise(function (resolve, reject) {
                _this.recordServices.readRegistry.request(name, function (error, data) { return error ? reject(error) : resolve(data); });
            });
        }
    };
    RecordHandler.prototype.has = function (name, callback) {
        var _this = this;
        if (typeof name !== 'string' || name.length === 0) {
            throw new Error('invalid argument: name');
        }
        if (callback !== undefined && typeof callback !== 'function') {
            throw new Error('invalid argument: callback');
        }
        var cb;
        if (!callback) {
            return new Promise(function (resolve, reject) {
                cb = function (error, version) { return error ? reject(error) : resolve(version !== -1); };
                _this.head(name, cb);
            });
        }
        cb = function (error, version) { return error ? callback(error, null) : callback(null, version !== -1); };
        this.head(name, cb);
    };
    RecordHandler.prototype.head = function (name, callback) {
        var _this = this;
        if (typeof name !== 'string' || name.length === 0) {
            throw new Error('invalid argument: name');
        }
        if (callback !== undefined && typeof callback !== 'function') {
            throw new Error('invalid argument: callback');
        }
        var recordCore = this.recordCores.get(name);
        if (recordCore) {
            if (callback) {
                recordCore.whenReady(null, function () {
                    callback(null, recordCore.version);
                });
            }
            else {
                return new Promise(function (resolve, reject) {
                    recordCore.whenReady(null, function () {
                        resolve(recordCore.version);
                    });
                });
            }
            return;
        }
        if (callback) {
            this.recordServices.headRegistry.request(name, callback);
        }
        else {
            return new Promise(function (resolve, reject) {
                _this.recordServices.headRegistry.request(name, function (error, data) { return error ? reject(error) : resolve(data); });
            });
        }
    };
    RecordHandler.prototype.setDataWithAck = function (recordName) {
        var _this = this;
        var rest = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            rest[_i - 1] = arguments[_i];
        }
        var args = utils.normalizeSetArguments(arguments, 1);
        if (!args.callback) {
            return new Promise(function (resolve, reject) {
                args.callback = function (error) { return error === null ? resolve() : reject(error); };
                _this.sendSetData(recordName, -1, args);
            });
        }
        this.sendSetData(recordName, -1, args);
    };
    RecordHandler.prototype.setData = function (recordName) {
        var args = utils.normalizeSetArguments(arguments, 1);
        this.sendSetData(recordName, -1, args);
    };
    RecordHandler.prototype.delete = function (recordName, callback) {
        // TODO: Use a delete service to make the logic in record core and here common
        throw Error('Delete is not yet supported without use of a Record');
    };
    RecordHandler.prototype.notify = function (recordNames, callback) {
        var _this = this;
        if (!this.services.connection.isConnected) {
            if (callback) {
                callback(constants_1.EVENT.CLIENT_OFFLINE);
                return;
            }
            return new Promise(function (resolve, reject) { return reject(constants_1.EVENT.CLIENT_OFFLINE); });
        }
        var correlationId = utils.getUid();
        this.services.connection.sendMessage({
            topic: constants_1.TOPIC.RECORD,
            action: constants_1.RECORD_ACTION.NOTIFY,
            names: recordNames,
            correlationId: correlationId
        });
        if (callback) {
            this.notifyCallbacks.set(correlationId, callback);
        }
        else {
            return new Promise(function (resolve, reject) {
                _this.notifyCallbacks.set(correlationId, function (error) { return error ? reject(error) : resolve(); });
            });
        }
    };
    RecordHandler.prototype.sendSetData = function (recordName, version, args) {
        var path = args.path, data = args.data, callback = args.callback;
        if (!recordName || typeof recordName !== 'string' || recordName.length === 0) {
            throw new Error('invalid argument: recordName must be an non empty string');
        }
        if (!path && (data === null || typeof data !== 'object')) {
            throw new Error('invalid argument: data must be an object when no path is provided');
        }
        var recordCores = this.recordCores.get(recordName);
        if (recordCores) {
            recordCores.set({ path: path, data: data, callback: callback });
            return;
        }
        var action;
        if (path) {
            if (data === undefined) {
                action = constants_1.RECORD_ACTION.ERASE;
            }
            else {
                action = constants_1.RECORD_ACTION.CREATEANDPATCH;
            }
        }
        else {
            action = constants_1.RECORD_ACTION.CREATEANDUPDATE;
        }
        var message = {
            topic: constants_1.TOPIC.RECORD,
            action: action,
            name: recordName,
            path: path,
            version: version,
            parsedData: data
        };
        if (callback) {
            this.recordServices.writeAckService.send(message, callback);
        }
        else {
            this.services.connection.sendMessage(message);
        }
    };
    RecordHandler.prototype.saveToOfflineStorage = function () {
        this.recordCores.forEach(function (recordCore) { return recordCore.saveRecordToOffline(); });
    };
    RecordHandler.prototype.clearOfflineStorage = function (callback) {
        var _this = this;
        if (callback) {
            this.services.storage.reset(callback);
        }
        else {
            return new Promise(function (resolve, reject) {
                _this.services.storage.reset(function (error) { return error ? reject(error) : resolve(); });
            });
        }
    };
    /**
     * Will be called by the client for incoming messages on the RECORD topic
     *
     * @param   {Object} message parsed and validated deepstream message
     */
    RecordHandler.prototype.handle = function (message) {
        var _this = this;
        if ((message.action === constants_1.RECORD_ACTION.NOTIFY && message.isAck) ||
            (message.isError && message.action === constants_1.RECORD_ACTION.RECORD_NOTIFY_ERROR)) {
            var callback = this.notifyCallbacks.get(message.correlationId);
            if (callback) {
                callback(message.data || null);
                this.notifyCallbacks.delete(message.correlationId);
            }
            else {
                this.services.logger.error(message, constants_1.RECORD_ACTION.NOTIFY);
            }
            return;
        }
        if (message.isAck) {
            this.services.timeoutRegistry.remove(message);
            return;
        }
        if (message.action === constants_1.RECORD_ACTION.SUBSCRIPTION_FOR_PATTERN_FOUND ||
            message.action === constants_1.RECORD_ACTION.SUBSCRIPTION_FOR_PATTERN_REMOVED ||
            message.action === constants_1.RECORD_ACTION.LISTEN ||
            message.action === constants_1.RECORD_ACTION.UNLISTEN) {
            this.listener.handle(message);
            return;
        }
        if (message.isWriteAck && message.action !== constants_1.RECORD_ACTION.VERSION_EXISTS) {
            this.recordServices.writeAckService.recieve(message);
            return;
        }
        if (message.action === constants_1.RECORD_ACTION.READ_RESPONSE || message.originalAction === constants_1.RECORD_ACTION.READ) {
            if (message.isError) {
                this.recordServices.readRegistry.recieve(message, constants_1.RECORD_ACTION[message.action]);
            }
            else {
                this.recordServices.readRegistry.recieve(message, null, message.parsedData);
            }
            return;
        }
        if (message.action === constants_1.RECORD_ACTION.HEAD_RESPONSE_BULK) {
            Object.keys(message.versions).forEach(function (name) {
                _this.recordServices.headRegistry.recieve({
                    topic: constants_1.TOPIC.RECORD,
                    action: constants_1.RECORD_ACTION.HEAD_RESPONSE,
                    originalAction: constants_1.RECORD_ACTION.HEAD,
                    name: name,
                    version: message.versions[name]
                }, null, message.versions[name]);
            });
        }
        if (message.action === constants_1.RECORD_ACTION.HEAD_RESPONSE ||
            message.originalAction === constants_1.RECORD_ACTION.HEAD) {
            if (message.isError) {
                this.recordServices.headRegistry.recieve(message, constants_1.RECORD_ACTION[message.action]);
            }
            else {
                this.recordServices.headRegistry.recieve(message, null, message.version);
            }
        }
        var recordCore = this.recordCores.get(message.name);
        if (recordCore) {
            recordCore.handle(message);
            return;
        }
        if (message.action === constants_1.RECORD_ACTION.VERSION_EXISTS) {
            return;
        }
        if (message.action === constants_1.RECORD_ACTION.SUBSCRIPTION_HAS_PROVIDER ||
            message.action === constants_1.RECORD_ACTION.SUBSCRIPTION_HAS_NO_PROVIDER) {
            // record can receive a HAS_PROVIDER after discarding the record
            return;
        }
        if (message.isError) {
            this.services.logger.error(message);
            return;
        }
        this.services.logger.error(message, constants_1.EVENT.UNSOLICITED_MESSAGE);
    };
    /**
     * Callback for 'deleted' and 'discard' events from a record. Removes the record from
     * the registry
     */
    RecordHandler.prototype.removeRecord = function (recordName) {
        this.recordCores.delete(recordName);
    };
    RecordHandler.prototype.getRecordCore = function (recordName) {
        var recordCore = this.recordCores.get(recordName);
        if (!recordCore) {
            recordCore = new record_core_1.RecordCore(recordName, this.services, this.options, this.recordServices, this.removeRecord);
            this.recordCores.set(recordName, recordCore);
        }
        return recordCore;
    };
    RecordHandler.prototype.syncDirtyRecords = function () {
        this.dirtyService.whenLoaded(this, this._syncDirtyRecords);
    };
    // TODO: Expose issues here, as there isn't a reason why a record core needs to exist in
    // order to sync up
    RecordHandler.prototype._syncDirtyRecords = function () {
        var e_1, _a;
        var dirtyRecords = this.dirtyService.getAll();
        try {
            for (var dirtyRecords_1 = __values(dirtyRecords), dirtyRecords_1_1 = dirtyRecords_1.next(); !dirtyRecords_1_1.done; dirtyRecords_1_1 = dirtyRecords_1.next()) {
                var _b = __read(dirtyRecords_1_1.value, 1), recordName = _b[0];
                var recordCore = this.recordCores.get(recordName);
                if (recordCore && recordCore.references.size > 0) {
                    // if it isn't zero the record core takes care of it
                    continue;
                }
                this.services.storage.get(recordName, this.sendUpdatedData);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (dirtyRecords_1_1 && !dirtyRecords_1_1.done && (_a = dirtyRecords_1.return)) _a.call(dirtyRecords_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
    };
    RecordHandler.prototype.sendUpdatedData = function (recordName, version, data) {
        var _this = this;
        if (version === -1) {
            // deleted locally, how to merge?
            this.services.logger.warn({ topic: constants_1.TOPIC.RECORD }, constants_1.RECORD_ACTION.DELETE, "Deleted record while offline, can't resolve");
            return;
        }
        var callback = function (error, name) {
            if (!error) {
                _this.dirtyService.setDirty(name, false);
            }
            else {
                _this.recordServices.readRegistry.register(name, _this, function (message) {
                    _this.recordServices.mergeStrategy.merge(message, version, data, _this.onMergeCompleted, _this);
                });
            }
        };
        this.sendSetData(recordName, version, { data: data, callback: callback });
    };
    RecordHandler.prototype.onMergeCompleted = function (error, _a, mergeData) {
        var name = _a.name, version = _a.version;
        this.sendSetData(name, version + 1, { data: mergeData });
    };
    RecordHandler.prototype.getBulkSubscriptionService = function (bulkSubscribe) {
        return new bulk_subscription_service_1.BulkSubscriptionService(this.services, this.options.subscriptionInterval, constants_1.TOPIC.RECORD, bulkSubscribe, constants_1.RECORD_ACTION.UNSUBSCRIBE, this.onBulkSubscriptionSent);
    };
    RecordHandler.prototype.onBulkSubscriptionSent = function (message) {
        if (!message.names) {
            this.services.timeoutRegistry.add({ message: message });
        }
    };
    return RecordHandler;
}());
exports.RecordHandler = RecordHandler;
