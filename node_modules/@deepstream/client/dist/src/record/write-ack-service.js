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
exports.WriteAcknowledgementService = void 0;
var constants_1 = require("../constants");
var WriteAcknowledgementService = /** @class */ (function () {
    function WriteAcknowledgementService(services) {
        this.services = services;
        this.responses = new Map();
        this.count = 1;
        this.services.connection.onLost(this.onConnectionLost.bind(this));
    }
    /**
     * Send message with write ack callback.
     */
    WriteAcknowledgementService.prototype.send = function (message, callback) {
        if (this.services.connection.isConnected === false) {
            this.services.timerRegistry.requestIdleCallback(callback.bind(this, constants_1.EVENT.CLIENT_OFFLINE, message.name));
            return;
        }
        var correlationId = this.count.toString();
        this.responses.set(correlationId, callback);
        this.services.connection.sendMessage(__assign(__assign({}, message), { correlationId: correlationId, isWriteAck: true }));
        this.count++;
    };
    WriteAcknowledgementService.prototype.recieve = function (message) {
        var id = message.correlationId;
        var response = this.responses.get(id);
        if (!response ||
            (message.action !== constants_1.RECORD_ACTION.WRITE_ACKNOWLEDGEMENT && !message.isError && !message.isWriteAck)) {
            return;
        }
        if (message.action === constants_1.RECORD_ACTION.VERSION_EXISTS) {
            response(message.reason || 'Write failed due to conflict', message.name);
        }
        else {
            message.isError
                ? response(constants_1.RECORD_ACTION[message.action], message.name)
                : response(null, message.name);
        }
        this.responses.delete(id);
    };
    WriteAcknowledgementService.prototype.onConnectionLost = function () {
        this.responses.forEach(function (response) { return response(constants_1.EVENT.CLIENT_OFFLINE); });
        this.responses.clear();
    };
    return WriteAcknowledgementService;
}());
exports.WriteAcknowledgementService = WriteAcknowledgementService;
