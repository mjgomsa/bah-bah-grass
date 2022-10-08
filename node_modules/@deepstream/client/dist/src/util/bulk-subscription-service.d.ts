import { Services } from '../deepstream-client';
import { TOPIC, Message } from '../constants';
export declare class BulkSubscriptionService<ACTION> {
    services: Services;
    private subscriptionInterval;
    private topic;
    private subscribeBulkAction;
    private unsubscribeBulkAction;
    private onSubscriptionSent;
    private subscribeNames;
    private unsubscribeNames;
    private timerRef;
    private correlationId;
    constructor(services: Services, subscriptionInterval: number, topic: TOPIC, subscribeBulkAction: ACTION, unsubscribeBulkAction: ACTION, onSubscriptionSent?: (message: Message) => void);
    subscribe(name: string): void;
    subscribeList(users: string[]): void;
    unsubscribe(name: string): void;
    unsubscribeList(users: string[]): void;
    private registerFlush;
    private sendMessages;
    onLost(): void;
}
