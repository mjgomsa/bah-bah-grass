import { TOPIC, JSONObject, STATE_REGISTRY_TOPIC } from '@deepstream/protobuf/dist/types/all'
import { Message, BulkSubscriptionMessage, SubscriptionMessage, ALL_ACTIONS, ParseResult } from '@deepstream/protobuf/dist/types/messages'

export declare type Primitive = string | number | boolean | bigint | symbol | undefined | null
type DeepPartial<T> = T extends Primitive ? T : T extends Function ? T : T extends Date ? T : T extends Map<infer K, infer V> ? DeepPartialMap<K, V> : T extends Set<infer U> ? DeepPartialSet<U> : T extends {} ? {
  [KK in keyof T]?: DeepPartial<T[KK]>;
} : Partial<T>
interface DeepPartialSet<ItemType> extends Set<DeepPartial<ItemType>> {
}
interface DeepPartialMap<KeyType, ValueType> extends Map<DeepPartial<KeyType>, DeepPartial<ValueType>> {
}

export enum LOG_LEVEL {
  DEBUG = 0,
  INFO = 1,
  WARN = 2,
  ERROR = 3,
  FATAL = 4,
  OFF = 100
}

interface MessageDistributor {
  distribute (socketWrapper: SocketWrapper, message: Message): void
  registerForTopic (topic: TOPIC, callback: (message: Message, fromServer: string) => void): void
}

export abstract class Handler<SpecificMessage> {
  public abstract handle (socketWrapper: SocketWrapper | null, message: SpecificMessage, originServerName: string): void
  public setConnectionListener? (connectionListener: ConnectionListener): void
  public async close (): Promise<void> {}
}

export interface SocketData {
  socketType: string
  userId: string | null
  clientData: object | null
  serverData: object | null,
  isRemote?: boolean
}

export interface SimpleSocketWrapper extends SocketData {
  parseMessage (serializedMessage: any): ParseResult[]
  sendMessage (message: Message, buffer?: boolean): void
  sendAckMessage (message: Message, buffer?: boolean): void
  sendBuiltMessage? (message: any, buffer?: boolean): void
}

export interface StatefulSocketWrapper extends SimpleSocketWrapper {
  isClosed: boolean,
  onClose: Function,
  removeOnClose: Function
  destroy: Function
  close: Function
  authAttempts: number
}

export interface UnauthenticatedSocketWrapper extends StatefulSocketWrapper {
  uuid: number
  getHandshakeData: Function
  onMessage: Function
  authCallback: Function | null
  getMessage: Function
  parseData: Function
  flush: () => void
}

export interface SocketWrapper extends UnauthenticatedSocketWrapper {
  userId: string
  serverData: JSONObject | null,
  clientData: JSONObject | null
}

export interface JifMessage {
  done: boolean
  message: JifResult
}

export interface JifResult {
  success: boolean
  data?: any
  error?: string
  version?: number
  users?: string[]
  errorTopic?: string
  errorAction?: string
  errorEvent?: EVENT | string
}

export interface SubscriptionListener {
  onSubscriptionRemoved (name: string, socketWrapper: SocketWrapper): void
  onLastSubscriptionRemoved (name: string): void
  onSubscriptionMade (name: string, socketWrapper: SocketWrapper): void
  onFirstSubscriptionMade (name: string): void
}

export interface MetaData {
  socketWrapper?: SocketWrapper | null,
  message?: Message,
  uuid?: string,
  recordName?: string,
  lockName?: string,
  [index: string]: any
}

export interface NamespacedLogger {
  shouldLog (logLevel: LOG_LEVEL): boolean
  info (event: EVENT | string, message?: string, metaData?: MetaData): void
  debug (event: EVENT | string, message?: string, metaData?: MetaData): void
  warn (event: EVENT | string, message: string, metaData?: MetaData): void
  error (event: EVENT | string, message: string, metaData?: MetaData): void
  fatal (event: EVENT | string, message: string, metaData?: MetaData): void
}

export interface DeepstreamHTTPMeta {
  headers: { [index: string]: string }
  url: string
}
export type DeepstreamHTTPResponse = (error: { statusCode: number, message: string } | null, data?: any) => void
export type PostRequestHandler<DataInterface> = (data: DataInterface, meta: DeepstreamHTTPMeta, onResponse: DeepstreamHTTPResponse) => void
export type GetRequestHandler = (meta: DeepstreamHTTPMeta, onResponse: DeepstreamHTTPResponse) => void

export interface SocketHandshakeData {
  remoteAddress: string
  headers: string[],
  referer: string
}

export interface WebSocketConnectionEndpoint {
  wsOptions: { [index: string]: any },
  onConnection: (socketWrapper: UnauthenticatedSocketWrapper) => void,
  onSocketClose: (socketWrapper: UnauthenticatedSocketWrapper) => void,
}

export type SocketWrapperFactory = Function

export interface DeepstreamHTTPService extends DeepstreamPlugin {
  registerPostPathPrefix: <DataInterface>(prefix: string, handler: PostRequestHandler<DataInterface>) => void
  registerGetPathPrefix: (prefix: string, handler: GetRequestHandler) => void,
  registerWebsocketEndpoint: (path: string, createSocketWrapper: SocketWrapperFactory, webSocketConnectionEndpointPlugin: WebSocketConnectionEndpoint) => void
  sendWebsocketMessage: (socket: any, message: any, isBinary: boolean) => void
  getSocketWrappersForUserId (userId: string): SocketWrapper[]
}

export interface DeepstreamLogger extends DeepstreamPlugin, NamespacedLogger {
  shouldLog (logLevel: LOG_LEVEL): boolean
  setLogLevel (logLevel: LOG_LEVEL): void
  getNameSpace (namespace: string): NamespacedLogger
}
export type LoggerPlugin<PluginOptions = any> = new (pluginConfig: PluginOptions, services: DeepstreamServices, config: DeepstreamConfig) => DeepstreamLogger

export interface ConnectionListener {
  onClientConnected (socketWrapper: SocketWrapper): void,
  onClientDisconnected (socketWrapper: SocketWrapper): void
}
export interface DeepstreamConnectionEndpoint extends DeepstreamPlugin {
  getClientVersions (): { [index: string]: Set<string> }
  onMessages (socketWrapper: SocketWrapper, messages: Message[]): void
  scheduleFlush? (socketWrapper: SocketWrapper): void,
  setConnectionListener? (connectionListener: ConnectionListener): void
}
export type ConnectionEndpointPlugin<PluginOptions = any> = new (pluginConfig: PluginOptions, services: DeepstreamServices, config: DeepstreamConfig) => DeepstreamConnectionEndpoint

export interface SocketConnectionEndpoint extends DeepstreamConnectionEndpoint {
  scheduleFlush (socketWrapper: SocketWrapper): void
}
export type SocketConnectionEndpointPlugin<PluginOptions = any> = new (pluginConfig: PluginOptions, services: DeepstreamServices, config: DeepstreamConfig) => SocketConnectionEndpoint

export type StateRegistryCallback = (name: string) => void
export interface StateRegistry {
  has (name: string): boolean
  add (name: string): void
  remove (name: string): void

  onAdd (callback: StateRegistryCallback): void
  onRemove (callback: StateRegistryCallback): void

  getAll (serverName?: string): string[]
  getAllServers (subscriptionName: string): string[]
  removeAll (serverName: string): void

  whenReady (): Promise<void>
}

export interface StateRegistryFactory extends DeepstreamPlugin {
  getStateRegistry (topic: TOPIC | STATE_REGISTRY_TOPIC): StateRegistry
  getStateRegistries (): Map<TOPIC | STATE_REGISTRY_TOPIC, StateRegistry>
}

export interface SubscriptionRegistry {
  getNames (): string[]
  getAllServers (subscriptionName: string): string[]
  getAllRemoteServers (subscriptionName: string): string[]
  hasName (subscriptionName: string): boolean
  sendToSubscribers (name: string, message: Message, noDelay: boolean, senderSocket: SocketWrapper | null, suppressRemote?: boolean): void
  subscribeBulk (message: BulkSubscriptionMessage, socket: SocketWrapper, silent?: boolean): void
  unsubscribeBulk (message: BulkSubscriptionMessage, socket: SocketWrapper, silent?: boolean): void
  subscribe (name: string, message: SubscriptionMessage, socket: SocketWrapper, silent?: boolean): void
  unsubscribe (name: string, message: SubscriptionMessage, socket: SocketWrapper, silent?: boolean): void
  getLocalSubscribers (name: string): Set<SocketWrapper>
  hasLocalSubscribers (name: string): boolean
  setSubscriptionListener (listener: SubscriptionListener): void
  setAction (subscriptionAction: string, action: ALL_ACTIONS): void
}

export interface SubscriptionRegistryFactory extends DeepstreamPlugin {
  getSubscriptionRegistry (topic: TOPIC | STATE_REGISTRY_TOPIC, clusterTopic: TOPIC | STATE_REGISTRY_TOPIC): SubscriptionRegistry
  getSubscriptionRegistries (): Map<TOPIC, SubscriptionRegistry>
}

export interface PluginConfig {
  name?: string
  path?: string
  type?: string
  options: any
}

// tslint:disable-next-line: max-classes-per-file
export abstract class DeepstreamPlugin {
  public abstract description: string
  public async whenReady (): Promise<void> {}
  public init? (): void
  public async close (): Promise<void> {}
  public setConnectionListener? (connectionListener: ConnectionListener): void
  public setRecordHandler? (recordHandler: any): void
}

export type StorageHeadBulkCallback = (error: string | null, versions?: { [index: string]: number }, missing?: string[]) => void
export type StorageHeadCallback = (error: string | null, version?: number) => void
export type StorageReadCallback = (error: string | null, version?: number, result?: any) => void
export type StorageWriteCallback = (error: string | null) => void

export interface DeepstreamStorage extends DeepstreamPlugin  {
  set (recordName: string, version: number, data: any, callback: StorageWriteCallback, metaData?: any): void
  get (recordName: string, callback: StorageReadCallback, metaData?: any): void
  delete (recordName: string, callback: StorageWriteCallback, metaData?: any): void
  deleteBulk (recordNames: string[], callback: StorageWriteCallback, metaData?: any): void
}

export interface DeepstreamCache extends DeepstreamStorage  {
  head (recordName: string, callback: StorageHeadCallback): void
  headBulk (recordNames: string[], callback: StorageHeadBulkCallback): void
}

export interface DeepstreamMonitoring extends DeepstreamPlugin  {
  onErrorLog (loglevel: LOG_LEVEL, event: EVENT, logMessage: string, metaData: MetaData): void
  onLogin (allowed: boolean, endpointType: string): void
  onMessageReceived (message: Message, socketData: SocketData): void
  onMessageSend (message: Message): void
  onBroadcast (message: Message, count: number): void
}
export type MonitoringPlugin<PluginOptions = any> = new (pluginConfig: PluginOptions, services: DeepstreamServices, config: DeepstreamConfig) => DeepstreamMonitoring

export interface DeepstreamTelemetry extends DeepstreamPlugin {
}
export type TelemetryPlugin<PluginOptions = any> = new (pluginConfig: PluginOptions, services: DeepstreamServices, config: DeepstreamConfig) => DeepstreamTelemetry


export type PermissionCallback = (socketWrapper: SocketWrapper, message: Message, passItOn: any, error: Error | string | ALL_ACTIONS | null, result: boolean) => void
export interface DeepstreamPermission extends DeepstreamPlugin {
  canPerformAction (socketWrapper: SocketWrapper, message: Message, callback: PermissionCallback, passItOn: any): void
}

export interface DeepstreamAuthenticationResult {
  isValid: boolean,
  id?: string,
  clientData?: JSONObject,
  serverData?: JSONObject
  token?: string
}

export type UserAuthenticationCallback = (isValid: boolean, userAuthData?: DeepstreamAuthenticationResult) => void
export interface DeepstreamAuthenticationCombiner extends DeepstreamPlugin  {
  isValidUser (connectionData: any, authData: any, callback: UserAuthenticationCallback): void
  onClientDisconnect (user: string): void
}

export interface DeepstreamAuthentication extends DeepstreamPlugin  {
  isValidUser (connectionData: any, authData: any): Promise<DeepstreamAuthenticationResult | null>
  onClientDisconnect? (user: string): void
}

export interface DeepstreamClusterNode extends DeepstreamPlugin  {
  send (message: Message, metaData?: any): void
  sendDirect (serverName: string, message: Message, metaData?: any): void
  subscribe<SpecificMessage> (stateRegistryTopic: TOPIC | STATE_REGISTRY_TOPIC, callback: (message: SpecificMessage, originServerName: string) => void): void
  close (): Promise<void>
}
export type ClusterNodePlugin<PluginOptions = any> = new (pluginConfig: PluginOptions, services: DeepstreamServices, config: DeepstreamConfig) => DeepstreamClusterNode

export type LockCallback = (locked: boolean) => void
export interface DeepstreamLockRegistry extends DeepstreamPlugin  {
  get (lock: string, callback: LockCallback): void
  release (lock: string): void
}
export type LockRegistryPlugin<PluginOptions = any> = new (pluginConfig: PluginOptions, services: DeepstreamServices, config: DeepstreamConfig) => DeepstreamLockRegistry

export interface ClusterRegistry extends DeepstreamPlugin {
  isLeader (): boolean
  getLeader (): string
  getAll (): string[],
  onServerAdded: (callback: (serverName: string) => void) => void,
  onServerRemoved: (callback: (serverName: string) => void) => void,
}
export type ClusterRegistryPlugin<PluginOptions = any> = new (pluginConfig: PluginOptions, services: DeepstreamServices, config: DeepstreamConfig) => ClusterRegistry

export type PartialDeepstreamConfig = DeepPartial<DeepstreamConfig>

export interface DeepstreamConfig {
  showLogo: boolean
  libDir: string | null
  logLevel: number
  serverName: string
  dependencyInitializationTimeout: number
  exitOnFatalError: boolean

  connectionEndpoints: PluginConfig[]

  subscriptions: PluginConfig,
  logger: PluginConfig
  auth: PluginConfig[]
  permission: PluginConfig
  cache: PluginConfig
  storage: PluginConfig
  monitoring: PluginConfig
  telemetry: PluginConfig
  locks: PluginConfig
  clusterNode: PluginConfig
  clusterStates: PluginConfig
  clusterRegistry: PluginConfig,
  httpServer: PluginConfig,

  plugins: { [index: string]: PluginConfig }

  enabledFeatures: {
    record: boolean,
    event: boolean,
    rpc: boolean,
    presence: boolean,
    monitoring: boolean
  },

  record: {
    storageHotPathPrefixes: string[]
    storageExclusionPrefixes: string[]
    storageRetrievalTimeout: number
    cacheRetrievalTimeout: number
  },

  rpc: {
    provideRequestorName: boolean
    provideRequestorData: boolean
    ackTimeout: number
    responseTimeout: number
  },

  listen: {
    responseTimeout: number
    shuffleProviders: boolean
    rematchInterval: number
    matchCooldown: number
  }
}

export interface DeepstreamServices {
  connectionEndpoints: DeepstreamConnectionEndpoint[]
  httpService: DeepstreamHTTPService
  cache: DeepstreamCache
  storage: DeepstreamStorage
  monitoring: DeepstreamMonitoring
  permission: DeepstreamPermission
  authentication: DeepstreamAuthenticationCombiner
  logger: DeepstreamLogger
  clusterNode: DeepstreamClusterNode
  locks: DeepstreamLockRegistry
  clusterRegistry: ClusterRegistry
  subscriptions: SubscriptionRegistryFactory
  clusterStates: StateRegistryFactory
  messageDistributor: MessageDistributor
  telemetry: DeepstreamTelemetry
  plugins: { [index: string]: DeepstreamPlugin },
  notifyFatalException: () => void
}

export type ConfigSchema = { [index: string] : { [index: string]: boolean | string }}
export type ValveSchema = { [index: string]: ConfigSchema }
export interface ValveConfig {
  cacheEvacuationInterval: number
  maxRuleIterations: number
  permissions: ValveSchema
}

export interface Provider {
  socketWrapper: SocketWrapper
  pattern: string
  closeListener?: () => void,
  responseTimeout?: NodeJS.Timeout
}

export interface UserData {
  clientData: any
  serverData: any
}

export enum EVENT {
  INFO = 'INFO',
  ERROR = 'ERROR',
  DEPRECATED = 'DEPRECATED',

  DEEPSTREAM_STATE_CHANGED = 'DEEPSTREAM_STATE_CHANGED',
  INCOMING_CONNECTION = 'INCOMING_CONNECTION',
  CLOSED_SOCKET_INTERACTION = 'CLOSED_SOCKET_INTERACTION',
  CLIENT_DISCONNECTED = 'CLIENT_DISCONNECTED',
  CONNECTION_ERROR = 'CONNECTION_ERROR',
  AUTH_ERROR = 'AUTH_ERROR',
  AUTH_RETRY_ATTEMPTS_EXCEEDED = 'AUTH_RETRY_ATTEMPTS_EXCEEDED',
  REGISTERING_USER = 'REGISTERING_USER',

  FATAL_EXCEPTION = 'FATAL_EXCEPTION',
  NOT_VALID_UUID = 'NOT_VALID_UUID',

  CONFIG_TRANSFORM = 'CONFIG_TRANSFORM',
  CONFIG_ERROR = 'CONFIG_ERROR',

  PLUGIN_ERROR = 'PLUGIN_ERROR',
  PLUGIN_INITIALIZATION_ERROR = 'PLUGIN_INITIALIZATION_ERROR',
  PLUGIN_INITIALIZATION_TIMEOUT = 'PLUGIN_INITIALIZATION_TIMEOUT',

  HTTP_REQUEST_TIMEOUT = 'HTTP_REQUEST_TIMEOUT',
  LOCK_RELEASE_TIMEOUT = 'LOCK_RELEASE_TIMEOUT',
  LOCK_REQUEST_TIMEOUT = 'LOCK_REQUEST_TIMEOUT',

  LEADING_LISTEN = 'LEADING_LISTEN',
  LOCAL_LISTEN = 'LOCAL_LISTEN',

  INVALID_CONFIG_DATA = 'INVALID_CONFIG_DATA',
  INVALID_STATE_TRANSITION = 'INVALID_STATE_TRANSITION',

  INVALID_LEADER_REQUEST = 'INVALID_LEADER_REQUEST',

  CLUSTER_LEAVE = 'CLUSTER_LEAVE',
  CLUSTER_JOIN = 'CLUSTER_JOIN',
  CLUSTER_SIZE = 'CLUSTER_SIZE',

  UNSUPPORTED_ACTION = 'UNSUPPORTED_ACTION',
  UNKNOWN_ACTION = 'UNKNOWN_ACTION',

  CLOSED_SOCKET = 'CLOSED_SOCKET',

  TELEMETRY_DEBUG = "TELEMETRY_DEBUG",
  TELEMETRY_UNREACHABLE = "TELEMETRY_UNREACHABLE"
}
