"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NativeTimerRegistry = void 0;
var NativeTimerRegistry = /** @class */ (function () {
    function NativeTimerRegistry() {
        this.registry = new Set();
    }
    NativeTimerRegistry.prototype.close = function () {
        this.registry.forEach(clearTimeout);
        this.registry.clear();
    };
    NativeTimerRegistry.prototype.has = function (timerId) {
        return this.registry.has(timerId);
    };
    NativeTimerRegistry.prototype.add = function (timeout) {
        var _this = this;
        var id = setTimeout(function () {
            _this.remove(id);
            timeout.callback.call(timeout.context, timeout.data);
        }, timeout.duration);
        this.registry.add(id);
        return id;
    };
    NativeTimerRegistry.prototype.remove = function (timerId) {
        clearTimeout(timerId);
        return this.registry.delete(timerId);
    };
    NativeTimerRegistry.prototype.requestIdleCallback = function (callback) {
        setTimeout(callback, 0);
    };
    return NativeTimerRegistry;
}());
exports.NativeTimerRegistry = NativeTimerRegistry;
