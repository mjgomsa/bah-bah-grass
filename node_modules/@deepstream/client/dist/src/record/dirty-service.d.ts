import { RecordOfflineStore } from '../deepstream-client';
export declare type DirtyRecordsIndex = Map<string, boolean>;
export declare class DirtyService {
    private storage;
    private readonly dirtyStorageName;
    private dirtyRecords;
    private loaded;
    private loadedCallback;
    private flushTimeout;
    constructor(storage: RecordOfflineStore, dirtyStorageName: string);
    isDirty(recordName: string): boolean;
    setDirty(recordName: string, isDirty: boolean): void;
    save(): void;
    whenLoaded(context: any, callback: () => void): void;
    getAll(): DirtyRecordsIndex;
    private load;
}
