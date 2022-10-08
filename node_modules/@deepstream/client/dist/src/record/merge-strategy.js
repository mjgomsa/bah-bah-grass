"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LOCAL_WINS = exports.REMOTE_WINS = void 0;
/**
 *  Choose the server's state over the client's
**/
var REMOTE_WINS = function (localValue, localVersion, remoteValue, remoteVersion, callback) {
    callback(null, remoteValue);
};
exports.REMOTE_WINS = REMOTE_WINS;
/**
 *  Choose the local state over the server's
**/
var LOCAL_WINS = function (localValue, localVersion, remoteValue, remoteVersion, callback) {
    callback(null, localValue);
};
exports.LOCAL_WINS = LOCAL_WINS;
