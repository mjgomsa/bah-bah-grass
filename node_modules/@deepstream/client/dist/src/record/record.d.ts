import { JSONObject, RecordData } from '../constants';
import { RecordCore, WriteAckCallback } from './record-core';
import { MergeStrategy } from './merge-strategy';
import { Emitter } from '../util/emitter';
export declare type SubscriptionCallback = (data: any) => void;
export declare class Record extends Emitter {
    private record;
    debugId: string | null;
    private subscriptions;
    constructor(record: RecordCore<Record>);
    get name(): string;
    get isReady(): boolean;
    get version(): number;
    get hasProvider(): boolean;
    whenReady(): Promise<Record>;
    whenReady(callback: ((record: Record) => void)): void;
    get(path?: string): any;
    set(data: JSONObject, callback?: WriteAckCallback): void;
    set(path: string, data: RecordData | undefined, callback?: WriteAckCallback): void;
    setWithAck(data: JSONObject): Promise<void>;
    setWithAck(data: JSONObject, callback: ((error: string) => void)): void;
    setWithAck(path: string, data: RecordData | undefined): Promise<void>;
    setWithAck(path: string, data: RecordData | undefined, callback: ((error: string) => void)): void;
    setWithAck(data: JSONObject, callback?: ((error: string) => void)): Promise<void> | void;
    /**
     * Deletes a path from the record. Equivalent to doing `record.set(path, undefined)`
     *
     * @param {String} path The path to be deleted
     */
    erase(path: string): void;
    /**
     * Deletes a path from the record and either takes a callback that will be called when the
     * write has been done or returns a promise that will resolve when the write is done.
     */
    eraseWithAck(path: string): Promise<void>;
    eraseWithAck(path: string, callback: ((error: string) => void)): void;
    subscribe(callback: SubscriptionCallback, triggerNow?: boolean): void;
    subscribe(path: string, callback: SubscriptionCallback, triggerNow?: boolean): void;
    unsubscribe(callback: SubscriptionCallback): void;
    unsubscribe(path: string, callback: SubscriptionCallback): void;
    discard(): void;
    delete(callback?: (error: string | null) => void): void | Promise<void>;
    setMergeStrategy(mergeStrategy: MergeStrategy): void;
}
