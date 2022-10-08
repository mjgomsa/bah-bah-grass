import { Services } from '../deepstream-client';
import { RecordData } from '../constants';
import { MergeStrategy } from './merge-strategy';
import { RecordMessage } from '@deepstream/protobuf/dist/types/messages';
export declare type MergeCompleteInternal = (error: string | null, message: RecordMessage, mergedData: RecordData, localVersion: number, localData: RecordData) => void;
export declare class MergeStrategyService {
    private services;
    private strategiesByRecord;
    private strategiesByPattern;
    private defaultStrategy;
    constructor(services: Services, defaultStrategy: MergeStrategy | null);
    setMergeStrategyByName(recordName: string, strategy: MergeStrategy): void;
    setMergeStrategyByPattern(pattern: RegExp, strategy: MergeStrategy): void;
    merge(remoteRecord: RecordMessage, localVersion: number, localData: RecordData, callback: MergeCompleteInternal, context: any): void;
}
