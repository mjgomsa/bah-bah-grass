"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoopStorage = void 0;
var NoopStorage = /** @class */ (function () {
    function NoopStorage() {
        this.isReady = true;
    }
    NoopStorage.prototype.get = function (recordName, callback) {
        setTimeout(callback.bind(this, recordName, -1, null), 0);
    };
    NoopStorage.prototype.set = function (recordName, version, data, callback) {
        setTimeout(callback, 0);
    };
    NoopStorage.prototype.delete = function (recordName, callback) {
        setTimeout(callback, 0);
    };
    NoopStorage.prototype.reset = function (callback) {
        callback(null);
    };
    return NoopStorage;
}());
exports.NoopStorage = NoopStorage;
