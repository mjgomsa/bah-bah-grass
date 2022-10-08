"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.IntervalTimerRegistry = void 0;
var IntervalTimerRegistry = /** @class */ (function () {
    function IntervalTimerRegistry(timerResolution) {
        this.timerResolution = timerResolution;
        this.registry = new Map();
        this.timerIdCounter = 0;
        this.timerId = setTimeout(this.triggerTimeouts.bind(this), this.timerResolution);
    }
    IntervalTimerRegistry.prototype.close = function () {
        clearInterval(this.timerId);
    };
    IntervalTimerRegistry.prototype.triggerTimeouts = function () {
        var e_1, _a;
        var now = Date.now();
        try {
            for (var _b = __values(this.registry), _c = _b.next(); !_c.done; _c = _b.next()) {
                var _d = __read(_c.value, 2), timerId = _d[0], timeout = _d[1];
                if (now - timeout.created > timeout.duration) {
                    timeout.callback.call(timeout.context, timeout.data);
                    this.registry.delete(timerId);
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        this.timerId = setTimeout(this.triggerTimeouts.bind(this), this.timerResolution);
    };
    IntervalTimerRegistry.prototype.has = function (timerId) {
        return this.registry.has(timerId);
    };
    IntervalTimerRegistry.prototype.add = function (timeout) {
        this.timerIdCounter++;
        timeout.created = Date.now();
        this.registry.set(this.timerIdCounter, timeout);
        return this.timerIdCounter;
    };
    IntervalTimerRegistry.prototype.remove = function (timerId) {
        return this.registry.delete(timerId);
    };
    IntervalTimerRegistry.prototype.requestIdleCallback = function (callback) {
        setTimeout(callback, 0);
    };
    return IntervalTimerRegistry;
}());
exports.IntervalTimerRegistry = IntervalTimerRegistry;
