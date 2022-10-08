import { EVENT } from '../constants';
import { Services } from '../deepstream-client';
import { Options } from '../client-options';
export declare type QueryResult = string[];
export interface IndividualQueryResult {
    [key: string]: boolean;
}
export declare type SubscribeCallback = (user: string, online: boolean) => void;
export declare class PresenceHandler {
    private services;
    private globalSubscriptionEmitter;
    private subscriptionEmitter;
    private queryEmitter;
    private queryAllEmitter;
    private counter;
    private limboQueue;
    private readonly bulkSubscription;
    constructor(services: Services, options: Options);
    subscribe(callback: SubscribeCallback): void;
    subscribe(user: string, callback: SubscribeCallback): void;
    unsubscribe(): void;
    unsubscribe(callback: SubscribeCallback): void;
    unsubscribe(user: string, callback?: SubscribeCallback): void;
    getAll(): Promise<QueryResult>;
    getAll(users: string[]): Promise<IndividualQueryResult>;
    getAll(callback: (error: {
        reason: EVENT;
    }, result?: QueryResult) => void): void;
    getAll(users: string[], callback: (error: {
        reason: EVENT;
    }, result?: IndividualQueryResult) => void): void;
    private handle;
    private sendQuery;
    private subscribeToAllChanges;
    private unsubscribeToAllChanges;
    private onConnectionReestablished;
    private onExitLimbo;
    private onBulkSubscriptionSent;
}
