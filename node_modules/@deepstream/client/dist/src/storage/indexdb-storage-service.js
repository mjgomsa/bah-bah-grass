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
exports.Storage = void 0;
var Operation;
(function (Operation) {
    Operation[Operation["GET"] = 0] = "GET";
    Operation[Operation["SET"] = 1] = "SET";
    Operation[Operation["DELETE"] = 2] = "DELETE";
})(Operation || (Operation = {}));
var Storage = /** @class */ (function () {
    function Storage(options) {
        var _this = this;
        this.options = options;
        this.isReady = false;
        this.queuedRequests = new Map();
        this.flushTimeout = null;
        if (typeof indexedDB === 'undefined' || indexedDB === null) {
            throw new Error('IndexDB currently not supported when deepstream in node');
        }
        this.flush = this.flush.bind(this);
        var _a = options.indexdb, objectStoreNames = _a.objectStoreNames, storageDatabaseName = _a.storageDatabaseName, defaultObjectStoreName = _a.defaultObjectStoreName, primaryKey = _a.primaryKey;
        if (!objectStoreNames.includes(defaultObjectStoreName)) {
            objectStoreNames.push(defaultObjectStoreName);
        }
        var dbVersion = options.indexdb.dbVersion;
        if (options.indexdb.autoVersion) {
            var previousDBStructureSerialized = localStorage.getItem("deepstream-db/" + storageDatabaseName);
            if (previousDBStructureSerialized) {
                var previousDBStructure = JSON.parse(previousDBStructureSerialized);
                var objectStoreChanged = (previousDBStructure.objectStoreNames.length !== objectStoreNames.length ||
                    previousDBStructure.objectStoreNames.some(function (name) { return !objectStoreNames.includes(name); }));
                if (objectStoreChanged) {
                    dbVersion = previousDBStructure.dbVersion + 1;
                }
                else {
                    dbVersion = previousDBStructure.dbVersion;
                }
            }
            else {
                dbVersion = 1;
            }
        }
        var request = indexedDB.open(storageDatabaseName, dbVersion);
        request.onerror = function (event) {
            console.error("Error opening index " + storageDatabaseName, event);
            // TODO: Workflow for lack of permissions to use indexDB
        };
        request.onsuccess = function (event) {
            _this.db = event.target.result;
            _this.onReady();
        };
        request.onupgradeneeded = function () {
            var db = request.result;
            objectStoreNames.forEach(function (objectStoreName) {
                if (!db.objectStoreNames.contains(objectStoreName)) {
                    db.createObjectStore(objectStoreName, { keyPath: primaryKey });
                }
            });
            for (var i = 0; i < db.objectStoreNames.length; i++) {
                if (objectStoreNames.includes(db.objectStoreNames[i]) === false) {
                    db.deleteObjectStore(db.objectStoreNames[i]);
                }
            }
            if (options.indexdb.autoVersion) {
                localStorage.setItem("deepstream-db/" + storageDatabaseName, JSON.stringify({ dbVersion: dbVersion, objectStoreNames: objectStoreNames }));
            }
        };
    }
    Storage.prototype.get = function (recordName, callback) {
        var ignore = this.options.indexdb.ignorePrefixes.some(function (prefix) { return recordName.startsWith(prefix); });
        if (ignore) {
            callback(recordName, -1, null);
            return;
        }
        this.insertRequest({ recordName: recordName, callback: callback, operation: Operation.GET });
    };
    Storage.prototype.set = function (recordName, version, data, callback) {
        var ignore = this.options.indexdb.ignorePrefixes.some(function (prefix) { return recordName.startsWith(prefix); });
        if (ignore) {
            callback(null, recordName);
            return;
        }
        this.insertRequest({ recordName: recordName, version: version, callback: callback, data: data, operation: Operation.SET });
    };
    Storage.prototype.delete = function (recordName, callback) {
        var ignore = this.options.indexdb.ignorePrefixes.some(function (prefix) { return recordName.startsWith(prefix); });
        if (ignore) {
            callback(null, recordName);
            return;
        }
        this.insertRequest({ recordName: recordName, callback: callback, operation: Operation.DELETE });
    };
    Storage.prototype.reset = function (callback) {
        var _this = this;
        if (this.db) {
            this.db.close();
            this.db = null;
        }
        var deleteDBReqeust = indexedDB.deleteDatabase(this.options.indexdb.storageDatabaseName);
        deleteDBReqeust.onblocked = function () { return setTimeout(function () { return _this.reset(callback); }, 1000); };
        deleteDBReqeust.onsuccess = function () { return callback(null); };
        deleteDBReqeust.onerror = function (event) {
            var errorMessage = "Error deleting database " + _this.options.indexdb.storageDatabaseName;
            console.error(errorMessage, event);
            callback(errorMessage);
        };
    };
    Storage.prototype.registerFlush = function () {
        if (this.isReady && !this.flushTimeout) {
            this.flushTimeout = setTimeout(this.flush, this.options.indexdb.flushTimeout);
        }
    };
    Storage.prototype.flush = function () {
        var e_1, _a;
        var _this = this;
        var transaction = this.db.transaction(this.queuedRequests.keys(), 'readwrite');
        var _loop_1 = function (key, queuedRequests) {
            var objectStore = transaction.objectStore(key);
            queuedRequests.forEach(function (_a) {
                var _b;
                var operation = _a.operation, recordName = _a.recordName, version = _a.version, data = _a.data, callback = _a.callback;
                switch (operation) {
                    case Operation.GET: {
                        var request_1 = objectStore.get(recordName);
                        // The api doesn't support get errors yet!
                        request_1.onerror = function (event) {
                            throw new Error("Requesting record " + recordName + " failed");
                        };
                        request_1.onsuccess = function () {
                            if (request_1.result) {
                                callback(recordName, request_1.result.version, request_1.result.data);
                            }
                            else {
                                callback(recordName, -1, null);
                            }
                        };
                        break;
                    }
                    case Operation.DELETE: {
                        var request = objectStore.delete(recordName);
                        request.onsuccess = function () { return callback(null); };
                        request.onerror = function (event) { return callback(event.errorCode); };
                        break;
                    }
                    case Operation.SET: {
                        var request = objectStore.put((_b = {}, _b[_this.options.indexdb.primaryKey] = recordName, _b.version = version, _b.data = data, _b));
                        request.onsuccess = function () { return callback(null); };
                        request.onerror = function (event) { return callback(event.errorCode); };
                        break;
                    }
                }
            });
        };
        try {
            for (var _b = __values(this.queuedRequests), _c = _b.next(); !_c.done; _c = _b.next()) {
                var _d = __read(_c.value, 2), key = _d[0], queuedRequests = _d[1];
                _loop_1(key, queuedRequests);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        this.queuedRequests.clear();
        this.flushTimeout = null;
    };
    Storage.prototype.onReady = function () {
        this.isReady = true;
        this.flush();
    };
    Storage.prototype.insertRequest = function (request) {
        var firstSlashIndex = request.recordName.indexOf('/');
        var objectStoreName;
        if (firstSlashIndex > -1) {
            objectStoreName = request.recordName.substring(0, firstSlashIndex);
            if (this.options.indexdb.objectStoreNames.indexOf(objectStoreName) === -1) {
                console.error("Object store names need to be predefined, missing " + objectStoreName + ". Using default objectStore instead.");
                objectStoreName = this.options.indexdb.defaultObjectStoreName;
            }
            else {
                request.recordName = request.recordName.substring(firstSlashIndex + 1, request.recordName.length);
            }
        }
        else {
            objectStoreName = this.options.indexdb.defaultObjectStoreName;
        }
        var requests = this.queuedRequests.get(objectStoreName);
        if (requests === undefined) {
            this.queuedRequests.set(objectStoreName, [request]);
        }
        else {
            requests.push(request);
        }
        this.registerFlush();
    };
    return Storage;
}());
exports.Storage = Storage;
