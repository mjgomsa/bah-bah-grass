import { RecordOfflineStore, offlineStoreWriteResponse } from '../deepstream-client';
import { Options } from '../client-options';
import { RecordData } from '../constants';
export declare class Storage implements RecordOfflineStore {
    isReady: boolean;
    private storage;
    constructor(options: Options);
    get(recordName: string, callback: ((recordName: string, version: number, data: RecordData) => void)): void;
    set(recordName: string, version: number, data: RecordData, callback: offlineStoreWriteResponse): void;
    delete(recordName: string, callback: offlineStoreWriteResponse): void;
    reset(callback: (error: string | null) => void): void;
}
