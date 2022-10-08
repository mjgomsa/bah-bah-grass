import { TimerRegistry, Timeout, TimerRef } from '../deepstream-client';
export declare class IntervalTimerRegistry implements TimerRegistry {
    private timerResolution;
    private registry;
    private timerIdCounter;
    private timerId;
    constructor(timerResolution: number);
    close(): void;
    private triggerTimeouts;
    has(timerId: TimerRef): boolean;
    add(timeout: Timeout): TimerRef;
    remove(timerId: TimerRef): boolean;
    requestIdleCallback(callback: Function): void;
}
