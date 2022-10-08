import { TimerRegistry, TimerRef, Timeout } from '../deepstream-client';
export declare class NativeTimerRegistry implements TimerRegistry {
    private registry;
    close(): void;
    has(timerId: TimerRef): boolean;
    add(timeout: Timeout): TimerRef;
    remove(timerId: TimerRef): boolean;
    requestIdleCallback(callback: Function): void;
}
