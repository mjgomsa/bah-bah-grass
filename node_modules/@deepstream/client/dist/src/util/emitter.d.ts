export declare class Emitter {
    private callbacks;
    /**
     * Listen on the given `event` with `fn`.
     */
    on(event: string, fn: Function, scope?: any): this;
    once(event: string, fn: Function, scope?: any): this;
    /**
     * Remove the given callback for `event` or all
     * registered callbacks.
     */
    off(event?: string, fn?: Function, scope?: any): this;
    removeContext(context: any): void;
    emit(event: string, ...args: any[]): this;
    /**
     * Check if this emitter has `event` handlers.
     */
    hasListeners(event: string): boolean;
    /**
     * Returns an array listing the events for which the emitter has registered listeners.
     */
    eventNames(): string[];
}
