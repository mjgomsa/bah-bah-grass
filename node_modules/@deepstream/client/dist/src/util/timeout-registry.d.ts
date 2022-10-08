import { Services } from '../deepstream-client';
import { Options } from '../client-options';
import { EVENT } from '../constants';
import { Emitter } from '../util/emitter';
import { RECORD_ACTION, RPC_ACTION } from '@deepstream/protobuf/dist/types/all';
import { Message } from '@deepstream/protobuf/dist/types/messages';
export declare type TimeoutId = string | null;
export declare type TimeoutAction = EVENT | RPC_ACTION | RECORD_ACTION;
export interface Timeout {
    event?: TimeoutAction;
    message: Message;
    callback?: (event: TimeoutAction, message: Message) => void;
    duration?: number;
}
/**
 * Subscriptions to events are in a pending state until deepstream acknowledges
 * them. This is a pattern that's used by numerour classes. This registry aims
 * to centralise the functionality necessary to keep track of subscriptions and
 * their respective timeouts.
 */
export declare class TimeoutRegistry extends Emitter {
    private services;
    private options;
    private register;
    constructor(services: Services, options: Options);
    /**
     * Add an entry
     */
    add(timeout: Timeout): TimeoutId;
    /**
     * Remove an entry
     */
    remove(message: Message): void;
    /**
     * Processes an incoming ACK-message and removes the corresponding subscription
     */
    clear(uniqueName: TimeoutId): void;
    /**
     * Will be invoked if the timeout has occured before the ack message was received
     */
    private onTimeout;
    /**
     * Returns a unique name from the timeout
     */
    private getUniqueName;
    /**
     * Remote all timeouts when connection disconnects
     */
    onConnectionLost(): void;
}
