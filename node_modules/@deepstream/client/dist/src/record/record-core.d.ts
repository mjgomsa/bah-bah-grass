import { Services, offlineStoreWriteResponse } from '../deepstream-client';
import { Options } from '../client-options';
import { RecordData, RecordMessage, RecordWriteMessage } from '../constants';
import { MergeStrategy } from './merge-strategy';
import { RecordServices } from './record-handler';
import { Emitter } from '../util/emitter';
import * as utils from '../util/utils';
import { StateMachine } from '../util/state-machine';
import { TimeoutId } from '../util/timeout-registry';
export declare type WriteAckCallback = (error: null | string, recordName: string) => void;
export declare const enum RECORD_STATE {
    SUBSCRIBING = "SUBSCRIBING",
    RESUBSCRIBING = "RESUBSCRIBING",
    LOADING_OFFLINE = "LOADING_OFFLINE",
    READY = "READY",
    MERGING = "MERGING",
    UNSUBSCRIBING = "UNSUBSCRIBING",
    UNSUBSCRIBED = "UNSUBSCRIBED",
    DELETING = "DELETING",
    DELETED = "DELETED",
    ERROR = "ERROR"
}
export declare class RecordCore<Context = null> extends Emitter {
    name: string;
    services: Services;
    options: Options;
    recordServices: RecordServices;
    whenComplete: (recordName: string) => void;
    isReady: boolean;
    hasProvider: boolean;
    version: number | null;
    references: Set<any>;
    emitter: Emitter;
    data: RecordData;
    stateMachine: StateMachine;
    responseTimeout: TimeoutId | null;
    discardTimeout: TimeoutId | null;
    deletedTimeout: TimeoutId | null;
    deleteResponse: {
        callback?: (error: string | null) => void;
        reject?: (error: string) => void;
        resolve?: () => void;
    } | null;
    pendingWrites: utils.RecordSetArguments[];
    private readyTimer;
    private recordReadOnlyMode;
    readyCallbacks: Array<{
        context: any;
        callback: Function;
    }>;
    constructor(name: string, services: Services, options: Options, recordServices: RecordServices, whenComplete: (recordName: string) => void);
    get recordState(): RECORD_STATE;
    addReference(ref: any): void;
    /**
    * Removes all change listeners and notifies the server that the client is
    * no longer interested in updates for this record
    */
    removeReference(ref: any): void;
    private onDirtyServiceLoaded;
    onStateChanged(newState: string, oldState: string): void;
    /**
     * Convenience method, similar to promises. Executes callback
     * whenever the record is ready, either immediately or once the ready
     * event is fired
     */
    whenReady(context: Context): Promise<Context>;
    whenReady(context: Context, callback: (context: Context) => void): void;
    /**
   */
    whenReadyInternal(context: Context | null, callback: (context: Context | null) => void): void;
    /**
     * Sets the value of either the entire dataset
     * or of a specific path within the record
     * and submits the changes to the server
     *
     * If the new data is equal to the current data, nothing will happen
     *
     * @param {[String|Object]} pathOrData Either a JSON path when called with
     *                                     two arguments or the data itself
     * @param {Object} data     The data that should be stored in the record
     */
    set({ path, data, callback }: utils.RecordSetArguments): void;
    /**
     * Wrapper function around the record.set that returns a promise
     * if no callback is supplied.
     * @returns {Promise} if a callback is omitted a Promise is returned with the result of the write
     */
    setWithAck(args: utils.RecordSetArguments): Promise<void> | void;
    /**
   * Returns a copy of either the entire dataset of the record
   * or - if called with a path - the value of that path within
   * the record's dataset.
   *
   * Returning a copy rather than the actual value helps to prevent
   * the record getting out of sync due to unintentional changes to
   * its data
   */
    get(path?: string): RecordData;
    /**
   * Subscribes to changes to the records dataset.
   *
   * Callback is the only mandatory argument.
   *
   * When called with a path, it will only subscribe to updates
   * to that path, rather than the entire record
   *
   * If called with true for triggerNow, the callback will
   * be called immediatly with the current value
   */
    subscribe(args: utils.RecordSubscribeArguments, context?: any): void;
    /**
     * Removes a subscription that was previously made using record.subscribe()
     *
     * Can be called with a path to remove the callback for this specific
     * path or only with a callback which removes it from the generic subscriptions
     *
     * Please Note: unsubscribe is a purely client side operation. If the app is no longer
     * interested in receiving updates for this record from the server it needs to call
     * discard instead
     *
     * @param   {String}           path  A JSON path
     * @param   {Function}         callback     The callback method. Please note, if a bound
     *                                          method was passed to subscribe, the same method
     *                                          must be passed to unsubscribe as well.
     */
    unsubscribe(args: utils.RecordSubscribeArguments, context?: any): void;
    /**
     * Deletes the record on the server.
     */
    delete(callback?: (error: string | null) => void): Promise<void> | void;
    /**
     * Set a merge strategy to resolve any merge conflicts that may occur due
     * to offline work or write conflicts. The function will be called with the
     * local record, the remote version/data and a callback to call once the merge has
     * completed or if an error occurs ( which leaves it in an inconsistent state until
     * the next update merge attempt ).
     */
    setMergeStrategy(mergeStrategy: MergeStrategy): void;
    saveRecordToOffline(callback?: offlineStoreWriteResponse): void;
    /**
     * Transition States
     */
    onSubscribing(): void;
    onResubscribing(): void;
    onReady(): void;
    private applyPendingWrites;
    onUnsubscribed(): void;
    onDeleted(): void;
    handle(message: RecordMessage): void;
    handleReadResponse(message: any): void;
    handleHeadResponse(message: RecordMessage): void;
    sendRead(): void;
    saveUpdate(): void;
    sendUpdate(path: string | null | undefined, data: RecordData, callback?: WriteAckCallback): void;
    sendCreateUpdate(data: RecordData): void;
    /**
     * Applies incoming updates and patches to the record's dataset
     */
    applyUpdate(message: RecordWriteMessage): void;
    /**
     * Compares the new values for every path with the previously stored ones and
     * updates the subscribers if the value has changed
     */
    applyChange(newData: RecordData, force?: boolean, save?: boolean): void;
    /**
     */
    private sendDelete;
    recoverRecordFromMessage(message: RecordWriteMessage): void;
    recoverRecordDeletedRemotely(): void;
    /**
   * Callback once the record merge has completed. If successful it will set the
   * record state, else emit and error and the record will remain in an
   * inconsistent state until the next update.
   */
    onRecordRecovered(error: string | null, recordMessage: RecordMessage, mergedData: RecordData): void;
    /**
   * A quick check that's carried out by most methods that interact with the record
   * to make sure it hasn't been destroyed yet - and to handle it gracefully if it has.
   */
    checkDestroyed(methodName: string): boolean;
    /**
     * Destroys the record and nulls all
     * its dependencies
     */
    destroy(): void;
    onConnectionReestablished(): void;
    onConnectionLost(): void;
    getDebugId(): string | null;
}
