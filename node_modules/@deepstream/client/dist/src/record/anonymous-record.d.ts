import { RecordCore, WriteAckCallback } from './record-core';
import { MergeStrategy } from './merge-strategy';
import { Emitter } from '../util/emitter';
export declare class AnonymousRecord extends Emitter {
    private record;
    private subscriptions;
    private getRecordCore;
    constructor(getRecordCore: (recordName: string) => RecordCore<AnonymousRecord>);
    get name(): string;
    get isReady(): boolean;
    get version(): number;
    whenReady(): Promise<AnonymousRecord>;
    whenReady(callback: ((record: AnonymousRecord) => void)): void;
    setName(recordName: string): Promise<AnonymousRecord>;
    setName(recordName: string, callback: (record: AnonymousRecord) => void): void;
    get(path?: string): any;
    set(data: any, callback?: WriteAckCallback): void;
    setWithAck(data: any, callback?: ((error: string) => void)): Promise<void> | void;
    erase(path: string): void;
    eraseWithAck(path: string, callback?: ((error: string) => void)): Promise<void> | void;
    subscribe(path: string, callback: (data: any) => void, triggerNow?: boolean): void;
    unsubscribe(path: string, callback: (data: any) => void): void;
    discard(): void;
    delete(callback?: (error: string | null) => void): void | Promise<void>;
    setMergeStrategy(mergeStrategy: MergeStrategy): void;
}
