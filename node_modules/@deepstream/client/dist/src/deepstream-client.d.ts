import { DefaultOptions, Options } from './client-options';
import * as C from './constants';
import { CONNECTION_STATE, RecordData, Message, JSONObject } from './constants';
import { Logger } from './util/logger';
import { TimeoutRegistry } from './util/timeout-registry';
import { Connection, AuthenticationCallback, ResumeCallback } from './connection/connection';
import { SocketFactory } from './connection/socket-factory';
import { EventHandler } from './event/event-handler';
import { RPCHandler } from './rpc/rpc-handler';
import { RecordHandler } from './record/record-handler';
import { PresenceHandler } from './presence/presence-handler';
import { Emitter } from './util/emitter';
export declare type offlineStoreWriteResponse = ((error: string | null, recordName: string) => void);
export interface RecordOfflineStore {
    get: (recordName: string, callback: ((recordName: string, version: number, data: RecordData) => void)) => void;
    set: (recordName: string, version: number, data: RecordData, callback: offlineStoreWriteResponse) => void;
    delete: (recordName: string, callback: offlineStoreWriteResponse) => void;
    reset: (callback: (error: string | null) => void) => void;
}
export declare type TimerRef = number;
export interface Timeout {
    callback: Function;
    duration: number;
    context: any;
    data?: any;
}
export interface TimerRegistry {
    close(): void;
    has(timerId: TimerRef): boolean;
    add(timeout: Timeout): TimerRef;
    remove(timerId: TimerRef): boolean;
    requestIdleCallback(callback: Function): void;
}
export interface Socket {
    close: () => void;
    onparsedmessages: (messages: Message[]) => void;
    onclosed: () => void;
    onopened: () => void;
    onerror: (error: any) => void;
    sendParsedMessage: (message: Message) => void;
    getTimeSinceLastMessage: () => number;
}
export interface Services {
    logger: Logger;
    connection: Connection;
    timeoutRegistry: TimeoutRegistry;
    timerRegistry: TimerRegistry;
    socketFactory: SocketFactory;
    storage: RecordOfflineStore;
}
export { DeepstreamClient, C, DefaultOptions };
declare class DeepstreamClient extends Emitter {
    event: EventHandler;
    rpc: RPCHandler;
    record: RecordHandler;
    presence: PresenceHandler;
    private services;
    private options;
    constructor(url: string, options?: Partial<Options>);
    login(): Promise<JSONObject>;
    login(callback: AuthenticationCallback): void;
    login(details: JSONObject): Promise<JSONObject>;
    login(details: JSONObject, callback: AuthenticationCallback): void;
    getConnectionState(): CONNECTION_STATE;
    close(): void;
    pause(): void;
    resume(callback?: ResumeCallback): void | Promise<void>;
    /**
    * Returns a random string. The first block of characters
    * is a timestamp, in order to allow databases to optimize for semi-
    * sequential numberings
    */
    getUid(): string;
}
