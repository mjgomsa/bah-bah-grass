"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
var constants_1 = require("../constants");
var messages_1 = require("@deepstream/protobuf/dist/types/messages");
var all_1 = require("@deepstream/protobuf/dist/types/all");
function isEvent(action) {
    // @ts-ignore
    return constants_1.EVENT[action] !== undefined;
}
var Logger = /** @class */ (function () {
    function Logger(emitter) {
        this.emitter = emitter;
    }
    Logger.prototype.warn = function (message, event, meta) {
        var warnMessage = "Warning: " + all_1.TOPIC[message.topic];
        var action = message.action;
        if (action) {
            warnMessage += " (" + messages_1.ACTIONS[message.topic][action] + ")";
        }
        if (event) {
            warnMessage += ": " + constants_1.EVENT[event];
        }
        if (meta) {
            warnMessage += " \u2013 " + (typeof meta === 'string' ? meta : JSON.stringify(meta));
        }
        // tslint:disable-next-line:no-console
        console.warn(warnMessage);
    };
    Logger.prototype.error = function (message, event, meta) {
        if (isEvent(event)) {
            if (event === constants_1.EVENT.IS_CLOSED || event === constants_1.EVENT.CONNECTION_ERROR) {
                this.emitter.emit('error', meta, constants_1.EVENT[event], all_1.TOPIC[all_1.TOPIC.CONNECTION]);
            }
        }
        else {
            var action = event ? event : message.action;
            this.emitter.emit('error', meta || message, messages_1.ACTIONS[message.topic][action], all_1.TOPIC[message.topic]);
        }
    };
    return Logger;
}());
exports.Logger = Logger;
