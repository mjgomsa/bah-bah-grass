import { Services } from '../deepstream-client';
import { Options } from '../client-options';
import { RPCResult } from '../constants';
export declare type RPCMakeCallback = (error: string | null, result?: RPCResult) => void;
/**
 * This class represents a single remote procedure
 * call made from the client to the server. It's main function
 * is to encapsulate the logic and to convert the
 * incoming response data
 */
export declare class RPC {
    private response;
    private services;
    constructor(name: string, correlationId: string, data: any, response: RPCMakeCallback, options: Options, services: Services);
    /**
     * Called once an ack message is received from the server
     */
    accept(): void;
    /**
     * Called once a response message is received from the server.
     */
    respond(data: any): void;
    /**
     * Called once an error is received from the server.
     */
    error(data: any): void;
}
