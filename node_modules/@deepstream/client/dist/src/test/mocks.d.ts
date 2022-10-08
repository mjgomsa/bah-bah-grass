import { SinonStub, SinonMock } from 'sinon';
import { Message, JSONObject, RECORD_ACTION } from '../constants';
import { SingleNotifier } from '../record/single-notifier';
import { WriteAcknowledgementService } from '../record/write-ack-service';
import { DirtyService } from '../record/dirty-service';
import { BulkSubscriptionService } from '../util/bulk-subscription-service';
import { NativeTimerRegistry } from '../util/native-timer-registry';
export declare const getLastMessageSent: () => Message;
export declare const getServicesMock: () => {
    socketFactory: (url: string, options: JSONObject) => any;
    getSocket: () => any;
    connection: {
        sendMessage: (message: Message) => void;
        getConnectionState: SinonStub<any[], any>;
        isConnected: boolean;
        isInLimbo: boolean;
        registerHandler: (topic: any, callback: Function) => void;
        onReestablished: (callback: Function) => void;
        onLost: (callback: Function) => void;
        onExitLimbo: (callback: Function) => void;
        removeOnReestablished: () => void;
        removeOnLost: () => void;
    };
    connectionMock: SinonMock;
    timeoutRegistry: {
        add: () => void;
        remove: () => void;
        clear: () => void;
    };
    timeoutRegistryMock: SinonMock;
    logger: {
        warn: () => void;
        error: () => void;
    };
    loggerMock: SinonMock;
    getLogger: () => any;
    timerRegistry: NativeTimerRegistry;
    getHandle: () => Function | null;
    simulateConnectionLost: () => void;
    simulateConnectionReestablished: () => void;
    simulateExitLimbo: () => void;
    storage: {
        get: () => void;
        set: () => void;
        delete: () => void;
        reset: () => void;
    };
    storageMock: SinonMock;
    verify: () => void;
};
export declare const getRecordServices: (services: any) => {
    dirtyService: DirtyService;
    dirtyServiceMock: SinonMock;
    headRegistry: SingleNotifier<Message>;
    headRegistryMock: SinonMock;
    readRegistry: SingleNotifier<Message>;
    readRegistryMock: SinonMock;
    writeAckService: WriteAcknowledgementService;
    writeAckServiceMock: SinonMock;
    bulkSubscriptionService: {
        23: BulkSubscriptionService<RECORD_ACTION>;
        21: BulkSubscriptionService<RECORD_ACTION>;
        22: BulkSubscriptionService<RECORD_ACTION>;
    };
    verify: () => void;
};
export declare const getListenerMock: () => {
    listener: any;
    listenerMock: SinonMock;
};
