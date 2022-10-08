"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultOptions = void 0;
var merge_strategy_1 = require("./record/merge-strategy");
exports.DefaultOptions = {
    nativeTimerRegistry: true,
    intervalTimerResolution: 50,
    subscriptionInterval: 100,
    heartbeatInterval: 30000,
    reconnectIntervalIncrement: 4000,
    maxReconnectInterval: 180000,
    maxReconnectAttempts: 5,
    subscriptionTimeout: 2000,
    recordReadAckTimeout: 15000,
    recordReadTimeout: 15000,
    recordDeleteTimeout: 15000,
    offlineBufferTimeout: 2000,
    recordDiscardTimeout: 5000,
    offlineEnabled: false,
    saveUpdatesOffline: false,
    recordReadOnlyMode: false,
    recordPrefixWriteWhitelist: [],
    path: '/deepstream',
    mergeStrategy: merge_strategy_1.REMOTE_WINS,
    recordDeepCopy: true,
    dirtyStorageName: '__ds__dirty_records',
    nodeStoragePath: './local-storage',
    indexdb: {
        autoVersion: false,
        dbVersion: 1,
        primaryKey: 'id',
        storageDatabaseName: 'deepstream',
        defaultObjectStoreName: 'records',
        objectStoreNames: [],
        ignorePrefixes: [],
        flushTimeout: 50,
    },
    nodeStorageSize: 5,
    lazyConnect: false,
    debug: false,
    initialRecordVersion: 1
};
