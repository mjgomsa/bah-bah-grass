import { Socket } from '../deepstream-client';
import { JSONObject } from '../constants';
export declare type SocketFactory = (url: string, options: JSONObject, heartBeatInterval: number) => Socket;
export declare const socketFactory: SocketFactory;
