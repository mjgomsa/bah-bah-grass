"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RPC = void 0;
var constants_1 = require("../constants");
/**
 * This class represents a single remote procedure
 * call made from the client to the server. It's main function
 * is to encapsulate the logic and to convert the
 * incoming response data
 */
var RPC = /** @class */ (function () {
    function RPC(name, correlationId, data, response, options, services) {
        this.response = response;
        this.services = services;
        var message = {
            topic: constants_1.TOPIC.RPC,
            action: constants_1.RPC_ACTION.REQUEST,
            correlationId: correlationId,
            name: name,
            parsedData: data
        };
        this.services.connection.sendMessage(message);
    }
    /**
     * Called once an ack message is received from the server
     */
    RPC.prototype.accept = function () {
    };
    /**
     * Called once a response message is received from the server.
     */
    RPC.prototype.respond = function (data) {
        this.response(null, data);
    };
    /**
     * Called once an error is received from the server.
     */
    RPC.prototype.error = function (data) {
        this.response(data);
    };
    return RPC;
}());
exports.RPC = RPC;
