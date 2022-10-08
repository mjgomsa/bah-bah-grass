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
exports.MergeStrategyService = void 0;
var constants_1 = require("../constants");
var MergeStrategyService = /** @class */ (function () {
    function MergeStrategyService(services, defaultStrategy) {
        this.services = services;
        this.defaultStrategy = defaultStrategy;
        this.strategiesByRecord = new Map();
        this.strategiesByPattern = new Map();
    }
    MergeStrategyService.prototype.setMergeStrategyByName = function (recordName, strategy) {
        this.strategiesByRecord.set(recordName, strategy);
    };
    MergeStrategyService.prototype.setMergeStrategyByPattern = function (pattern, strategy) {
        this.strategiesByPattern.set(pattern, strategy);
    };
    MergeStrategyService.prototype.merge = function (remoteRecord, localVersion, localData, callback, context) {
        var e_1, _a;
        var recordName = remoteRecord.name;
        var exactMergeStrategy = this.strategiesByRecord.get(recordName);
        if (exactMergeStrategy) {
            exactMergeStrategy(localData, localVersion, remoteRecord.parsedData, remoteRecord.version, function (error, data) {
                callback.call(context, error, remoteRecord, data, localVersion, localData);
            });
            return;
        }
        try {
            for (var _b = __values(this.strategiesByPattern), _c = _b.next(); !_c.done; _c = _b.next()) {
                var _d = __read(_c.value, 2), pattern = _d[0], patternMergeStrategy = _d[1];
                if (pattern.test(recordName)) {
                    patternMergeStrategy(localData, localVersion, remoteRecord.parsedData, remoteRecord.version, function (error, data) {
                        callback.call(context, error, remoteRecord, data, localVersion, localData);
                    });
                    return;
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
        if (this.defaultStrategy) {
            this.defaultStrategy(localData, localVersion, remoteRecord.parsedData, remoteRecord.version, function (error, data) {
                callback.call(context, error, remoteRecord, data, localVersion, localData);
            });
            return;
        }
        this.services.logger.error({ topic: constants_1.TOPIC.RECORD }, constants_1.EVENT.RECORD_VERSION_EXISTS, { remoteVersion: remoteRecord.version, recordName: recordName });
    };
    return MergeStrategyService;
}());
exports.MergeStrategyService = MergeStrategyService;
