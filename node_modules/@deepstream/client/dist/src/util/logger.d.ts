import { EVENT } from '../constants';
import { ALL_ACTIONS, Message } from '@deepstream/protobuf/dist/types/messages';
import { TOPIC, JSONObject } from '@deepstream/protobuf/dist/types/all';
import { Emitter } from './emitter';
export declare class Logger {
    private emitter;
    constructor(emitter: Emitter);
    warn(message: {
        topic: TOPIC;
    } | Message, event?: EVENT | ALL_ACTIONS, meta?: any): void;
    error(message: {
        topic: TOPIC;
    } | Message, event?: EVENT | ALL_ACTIONS, meta?: string | JSONObject | Error): void;
}
