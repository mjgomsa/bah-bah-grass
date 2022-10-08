import { RecordOfflineStore, offlineStoreWriteResponse } from '../deepstream-client';
import { Options } from '../client-options';
import { RecordData } from '../constants';
export declare class Storage implements RecordOfflineStore {
    private options;
    private isReady;
    private db;
    private queuedRequests;
    private flushTimeout;
    constructor(options: Options);
    get(recordName: string, callback: ((recordName: string, version: number, data: RecordData) => void)): void;
    set(recordName: string, version: number, data: RecordData, callback: offlineStoreWriteResponse): void;
    delete(recordName: string, callback: offlineStoreWriteResponse): void;
    reset(callback: (error: string | null) => void): void;
    private registerFlush;
    private flush;
    private onReady;
    private insertRequest;
}
