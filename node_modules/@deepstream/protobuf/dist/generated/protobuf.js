/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
"use strict";

var $protobuf = require("protobufjs/minimal");

// Common aliases
var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

/**
 * AUTH_ACTION enum.
 * @exports AUTH_ACTION
 * @enum {number}
 * @property {number} AUTH_UNKNOWN=0 AUTH_UNKNOWN value
 * @property {number} AUTH_ERROR=1 AUTH_ERROR value
 * @property {number} AUTH_REQUEST=2 AUTH_REQUEST value
 * @property {number} AUTH_AUTH_SUCCESSFUL=3 AUTH_AUTH_SUCCESSFUL value
 * @property {number} AUTH_AUTH_UNSUCCESSFUL=4 AUTH_AUTH_UNSUCCESSFUL value
 * @property {number} AUTH_TOO_MANY_AUTH_ATTEMPTS=100 AUTH_TOO_MANY_AUTH_ATTEMPTS value
 * @property {number} AUTH_INVALID_MESSAGE=101 AUTH_INVALID_MESSAGE value
 * @property {number} AUTH_INVALID_MESSAGE_DATA=102 AUTH_INVALID_MESSAGE_DATA value
 */
$root.AUTH_ACTION = (function() {
    var valuesById = {}, values = Object.create(valuesById);
    values[valuesById[0] = "AUTH_UNKNOWN"] = 0;
    values[valuesById[1] = "AUTH_ERROR"] = 1;
    values[valuesById[2] = "AUTH_REQUEST"] = 2;
    values[valuesById[3] = "AUTH_AUTH_SUCCESSFUL"] = 3;
    values[valuesById[4] = "AUTH_AUTH_UNSUCCESSFUL"] = 4;
    values[valuesById[100] = "AUTH_TOO_MANY_AUTH_ATTEMPTS"] = 100;
    values[valuesById[101] = "AUTH_INVALID_MESSAGE"] = 101;
    values[valuesById[102] = "AUTH_INVALID_MESSAGE_DATA"] = 102;
    return values;
})();

$root.AuthMessage = (function() {

    /**
     * Properties of an AuthMessage.
     * @exports IAuthMessage
     * @interface IAuthMessage
     * @property {AUTH_ACTION|null} [action] AuthMessage action
     * @property {string|null} [data] AuthMessage data
     * @property {boolean|null} [isError] AuthMessage isError
     * @property {boolean|null} [isAck] AuthMessage isAck
     */

    /**
     * Constructs a new AuthMessage.
     * @exports AuthMessage
     * @classdesc Represents an AuthMessage.
     * @implements IAuthMessage
     * @constructor
     * @param {IAuthMessage=} [properties] Properties to set
     */
    function AuthMessage(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * AuthMessage action.
     * @member {AUTH_ACTION} action
     * @memberof AuthMessage
     * @instance
     */
    AuthMessage.prototype.action = 0;

    /**
     * AuthMessage data.
     * @member {string} data
     * @memberof AuthMessage
     * @instance
     */
    AuthMessage.prototype.data = "";

    /**
     * AuthMessage isError.
     * @member {boolean} isError
     * @memberof AuthMessage
     * @instance
     */
    AuthMessage.prototype.isError = false;

    /**
     * AuthMessage isAck.
     * @member {boolean} isAck
     * @memberof AuthMessage
     * @instance
     */
    AuthMessage.prototype.isAck = false;

    /**
     * Encodes the specified AuthMessage message. Does not implicitly {@link AuthMessage.verify|verify} messages.
     * @function encode
     * @memberof AuthMessage
     * @static
     * @param {IAuthMessage} message AuthMessage message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    AuthMessage.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.action != null && Object.hasOwnProperty.call(message, "action"))
            writer.uint32(/* id 1, wireType 0 =*/8).int32(message.action);
        if (message.data != null && Object.hasOwnProperty.call(message, "data"))
            writer.uint32(/* id 2, wireType 2 =*/18).string(message.data);
        if (message.isError != null && Object.hasOwnProperty.call(message, "isError"))
            writer.uint32(/* id 3, wireType 0 =*/24).bool(message.isError);
        if (message.isAck != null && Object.hasOwnProperty.call(message, "isAck"))
            writer.uint32(/* id 4, wireType 0 =*/32).bool(message.isAck);
        return writer;
    };

    /**
     * Encodes the specified AuthMessage message, length delimited. Does not implicitly {@link AuthMessage.verify|verify} messages.
     * @function encodeDelimited
     * @memberof AuthMessage
     * @static
     * @param {IAuthMessage} message AuthMessage message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    AuthMessage.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes an AuthMessage message from the specified reader or buffer.
     * @function decode
     * @memberof AuthMessage
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {AuthMessage} AuthMessage
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    AuthMessage.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.AuthMessage();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.action = reader.int32();
                break;
            case 2:
                message.data = reader.string();
                break;
            case 3:
                message.isError = reader.bool();
                break;
            case 4:
                message.isAck = reader.bool();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes an AuthMessage message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof AuthMessage
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {AuthMessage} AuthMessage
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    AuthMessage.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    return AuthMessage;
})();

/**
 * CLUSTER_ACTION enum.
 * @exports CLUSTER_ACTION
 * @enum {number}
 * @property {number} CLUSTER_UNKNOWN=0 CLUSTER_UNKNOWN value
 * @property {number} CLUSTER_REMOVE=1 CLUSTER_REMOVE value
 * @property {number} CLUSTER_STATUS=2 CLUSTER_STATUS value
 */
$root.CLUSTER_ACTION = (function() {
    var valuesById = {}, values = Object.create(valuesById);
    values[valuesById[0] = "CLUSTER_UNKNOWN"] = 0;
    values[valuesById[1] = "CLUSTER_REMOVE"] = 1;
    values[valuesById[2] = "CLUSTER_STATUS"] = 2;
    return values;
})();

$root.ClusterMessage = (function() {

    /**
     * Properties of a ClusterMessage.
     * @exports IClusterMessage
     * @interface IClusterMessage
     * @property {CLUSTER_ACTION|null} [action] ClusterMessage action
     * @property {string|null} [data] ClusterMessage data
     * @property {boolean|null} [isError] ClusterMessage isError
     * @property {boolean|null} [isAck] ClusterMessage isAck
     * @property {number|null} [leaderScore] ClusterMessage leaderScore
     * @property {string|null} [role] ClusterMessage role
     */

    /**
     * Constructs a new ClusterMessage.
     * @exports ClusterMessage
     * @classdesc Represents a ClusterMessage.
     * @implements IClusterMessage
     * @constructor
     * @param {IClusterMessage=} [properties] Properties to set
     */
    function ClusterMessage(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * ClusterMessage action.
     * @member {CLUSTER_ACTION} action
     * @memberof ClusterMessage
     * @instance
     */
    ClusterMessage.prototype.action = 0;

    /**
     * ClusterMessage data.
     * @member {string} data
     * @memberof ClusterMessage
     * @instance
     */
    ClusterMessage.prototype.data = "";

    /**
     * ClusterMessage isError.
     * @member {boolean} isError
     * @memberof ClusterMessage
     * @instance
     */
    ClusterMessage.prototype.isError = false;

    /**
     * ClusterMessage isAck.
     * @member {boolean} isAck
     * @memberof ClusterMessage
     * @instance
     */
    ClusterMessage.prototype.isAck = false;

    /**
     * ClusterMessage leaderScore.
     * @member {number} leaderScore
     * @memberof ClusterMessage
     * @instance
     */
    ClusterMessage.prototype.leaderScore = 0;

    /**
     * ClusterMessage role.
     * @member {string} role
     * @memberof ClusterMessage
     * @instance
     */
    ClusterMessage.prototype.role = "";

    /**
     * Encodes the specified ClusterMessage message. Does not implicitly {@link ClusterMessage.verify|verify} messages.
     * @function encode
     * @memberof ClusterMessage
     * @static
     * @param {IClusterMessage} message ClusterMessage message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    ClusterMessage.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.action != null && Object.hasOwnProperty.call(message, "action"))
            writer.uint32(/* id 1, wireType 0 =*/8).int32(message.action);
        if (message.data != null && Object.hasOwnProperty.call(message, "data"))
            writer.uint32(/* id 2, wireType 2 =*/18).string(message.data);
        if (message.isError != null && Object.hasOwnProperty.call(message, "isError"))
            writer.uint32(/* id 3, wireType 0 =*/24).bool(message.isError);
        if (message.isAck != null && Object.hasOwnProperty.call(message, "isAck"))
            writer.uint32(/* id 4, wireType 0 =*/32).bool(message.isAck);
        if (message.leaderScore != null && Object.hasOwnProperty.call(message, "leaderScore"))
            writer.uint32(/* id 5, wireType 0 =*/40).int32(message.leaderScore);
        if (message.role != null && Object.hasOwnProperty.call(message, "role"))
            writer.uint32(/* id 7, wireType 2 =*/58).string(message.role);
        return writer;
    };

    /**
     * Encodes the specified ClusterMessage message, length delimited. Does not implicitly {@link ClusterMessage.verify|verify} messages.
     * @function encodeDelimited
     * @memberof ClusterMessage
     * @static
     * @param {IClusterMessage} message ClusterMessage message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    ClusterMessage.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a ClusterMessage message from the specified reader or buffer.
     * @function decode
     * @memberof ClusterMessage
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {ClusterMessage} ClusterMessage
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    ClusterMessage.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.ClusterMessage();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.action = reader.int32();
                break;
            case 2:
                message.data = reader.string();
                break;
            case 3:
                message.isError = reader.bool();
                break;
            case 4:
                message.isAck = reader.bool();
                break;
            case 5:
                message.leaderScore = reader.int32();
                break;
            case 7:
                message.role = reader.string();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a ClusterMessage message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof ClusterMessage
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {ClusterMessage} ClusterMessage
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    ClusterMessage.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    return ClusterMessage;
})();

/**
 * CONNECTION_ACTION enum.
 * @exports CONNECTION_ACTION
 * @enum {number}
 * @property {number} CONNECTION_UNKNOWN=0 CONNECTION_UNKNOWN value
 * @property {number} CONNECTION_ERROR=1 CONNECTION_ERROR value
 * @property {number} CONNECTION_PING=2 CONNECTION_PING value
 * @property {number} CONNECTION_PONG=3 CONNECTION_PONG value
 * @property {number} CONNECTION_ACCEPT=4 CONNECTION_ACCEPT value
 * @property {number} CONNECTION_CHALLENGE=5 CONNECTION_CHALLENGE value
 * @property {number} CONNECTION_REJECT=6 CONNECTION_REJECT value
 * @property {number} CONNECTION_REDIRECT=7 CONNECTION_REDIRECT value
 * @property {number} CONNECTION_CLOSING=8 CONNECTION_CLOSING value
 * @property {number} CONNECTION_CLOSED=9 CONNECTION_CLOSED value
 * @property {number} CONNECTION_AUTHENTICATION_TIMEOUT=100 CONNECTION_AUTHENTICATION_TIMEOUT value
 * @property {number} CONNECTION_INVALID_MESSAGE=101 CONNECTION_INVALID_MESSAGE value
 */
$root.CONNECTION_ACTION = (function() {
    var valuesById = {}, values = Object.create(valuesById);
    values[valuesById[0] = "CONNECTION_UNKNOWN"] = 0;
    values[valuesById[1] = "CONNECTION_ERROR"] = 1;
    values[valuesById[2] = "CONNECTION_PING"] = 2;
    values[valuesById[3] = "CONNECTION_PONG"] = 3;
    values[valuesById[4] = "CONNECTION_ACCEPT"] = 4;
    values[valuesById[5] = "CONNECTION_CHALLENGE"] = 5;
    values[valuesById[6] = "CONNECTION_REJECT"] = 6;
    values[valuesById[7] = "CONNECTION_REDIRECT"] = 7;
    values[valuesById[8] = "CONNECTION_CLOSING"] = 8;
    values[valuesById[9] = "CONNECTION_CLOSED"] = 9;
    values[valuesById[100] = "CONNECTION_AUTHENTICATION_TIMEOUT"] = 100;
    values[valuesById[101] = "CONNECTION_INVALID_MESSAGE"] = 101;
    return values;
})();

$root.ConnectionMessage = (function() {

    /**
     * Properties of a ConnectionMessage.
     * @exports IConnectionMessage
     * @interface IConnectionMessage
     * @property {CONNECTION_ACTION|null} [action] ConnectionMessage action
     * @property {string|null} [data] ConnectionMessage data
     * @property {boolean|null} [isError] ConnectionMessage isError
     * @property {boolean|null} [isAck] ConnectionMessage isAck
     * @property {string|null} [url] ConnectionMessage url
     * @property {string|null} [protocolVersion] ConnectionMessage protocolVersion
     * @property {string|null} [sdkType] ConnectionMessage sdkType
     * @property {string|null} [sdkVersion] ConnectionMessage sdkVersion
     */

    /**
     * Constructs a new ConnectionMessage.
     * @exports ConnectionMessage
     * @classdesc Represents a ConnectionMessage.
     * @implements IConnectionMessage
     * @constructor
     * @param {IConnectionMessage=} [properties] Properties to set
     */
    function ConnectionMessage(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * ConnectionMessage action.
     * @member {CONNECTION_ACTION} action
     * @memberof ConnectionMessage
     * @instance
     */
    ConnectionMessage.prototype.action = 0;

    /**
     * ConnectionMessage data.
     * @member {string} data
     * @memberof ConnectionMessage
     * @instance
     */
    ConnectionMessage.prototype.data = "";

    /**
     * ConnectionMessage isError.
     * @member {boolean} isError
     * @memberof ConnectionMessage
     * @instance
     */
    ConnectionMessage.prototype.isError = false;

    /**
     * ConnectionMessage isAck.
     * @member {boolean} isAck
     * @memberof ConnectionMessage
     * @instance
     */
    ConnectionMessage.prototype.isAck = false;

    /**
     * ConnectionMessage url.
     * @member {string} url
     * @memberof ConnectionMessage
     * @instance
     */
    ConnectionMessage.prototype.url = "";

    /**
     * ConnectionMessage protocolVersion.
     * @member {string} protocolVersion
     * @memberof ConnectionMessage
     * @instance
     */
    ConnectionMessage.prototype.protocolVersion = "";

    /**
     * ConnectionMessage sdkType.
     * @member {string} sdkType
     * @memberof ConnectionMessage
     * @instance
     */
    ConnectionMessage.prototype.sdkType = "";

    /**
     * ConnectionMessage sdkVersion.
     * @member {string} sdkVersion
     * @memberof ConnectionMessage
     * @instance
     */
    ConnectionMessage.prototype.sdkVersion = "";

    /**
     * Encodes the specified ConnectionMessage message. Does not implicitly {@link ConnectionMessage.verify|verify} messages.
     * @function encode
     * @memberof ConnectionMessage
     * @static
     * @param {IConnectionMessage} message ConnectionMessage message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    ConnectionMessage.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.action != null && Object.hasOwnProperty.call(message, "action"))
            writer.uint32(/* id 1, wireType 0 =*/8).int32(message.action);
        if (message.data != null && Object.hasOwnProperty.call(message, "data"))
            writer.uint32(/* id 2, wireType 2 =*/18).string(message.data);
        if (message.isError != null && Object.hasOwnProperty.call(message, "isError"))
            writer.uint32(/* id 3, wireType 0 =*/24).bool(message.isError);
        if (message.isAck != null && Object.hasOwnProperty.call(message, "isAck"))
            writer.uint32(/* id 4, wireType 0 =*/32).bool(message.isAck);
        if (message.url != null && Object.hasOwnProperty.call(message, "url"))
            writer.uint32(/* id 5, wireType 2 =*/42).string(message.url);
        if (message.protocolVersion != null && Object.hasOwnProperty.call(message, "protocolVersion"))
            writer.uint32(/* id 6, wireType 2 =*/50).string(message.protocolVersion);
        if (message.sdkVersion != null && Object.hasOwnProperty.call(message, "sdkVersion"))
            writer.uint32(/* id 7, wireType 2 =*/58).string(message.sdkVersion);
        if (message.sdkType != null && Object.hasOwnProperty.call(message, "sdkType"))
            writer.uint32(/* id 8, wireType 2 =*/66).string(message.sdkType);
        return writer;
    };

    /**
     * Encodes the specified ConnectionMessage message, length delimited. Does not implicitly {@link ConnectionMessage.verify|verify} messages.
     * @function encodeDelimited
     * @memberof ConnectionMessage
     * @static
     * @param {IConnectionMessage} message ConnectionMessage message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    ConnectionMessage.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a ConnectionMessage message from the specified reader or buffer.
     * @function decode
     * @memberof ConnectionMessage
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {ConnectionMessage} ConnectionMessage
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    ConnectionMessage.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.ConnectionMessage();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.action = reader.int32();
                break;
            case 2:
                message.data = reader.string();
                break;
            case 3:
                message.isError = reader.bool();
                break;
            case 4:
                message.isAck = reader.bool();
                break;
            case 5:
                message.url = reader.string();
                break;
            case 6:
                message.protocolVersion = reader.string();
                break;
            case 8:
                message.sdkType = reader.string();
                break;
            case 7:
                message.sdkVersion = reader.string();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a ConnectionMessage message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof ConnectionMessage
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {ConnectionMessage} ConnectionMessage
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    ConnectionMessage.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    return ConnectionMessage;
})();

/**
 * EVENT_ACTION enum.
 * @exports EVENT_ACTION
 * @enum {number}
 * @property {number} EVENT_UNKNOWN=0 EVENT_UNKNOWN value
 * @property {number} EVENT_ERROR=1 EVENT_ERROR value
 * @property {number} EVENT_EMIT=2 EVENT_EMIT value
 * @property {number} EVENT_SUBSCRIBE=3 EVENT_SUBSCRIBE value
 * @property {number} EVENT_UNSUBSCRIBE=4 EVENT_UNSUBSCRIBE value
 * @property {number} EVENT_LISTEN=5 EVENT_LISTEN value
 * @property {number} EVENT_UNLISTEN=6 EVENT_UNLISTEN value
 * @property {number} EVENT_LISTEN_ACCEPT=7 EVENT_LISTEN_ACCEPT value
 * @property {number} EVENT_LISTEN_REJECT=8 EVENT_LISTEN_REJECT value
 * @property {number} EVENT_SUBSCRIPTION_HAS_PROVIDER=9 EVENT_SUBSCRIPTION_HAS_PROVIDER value
 * @property {number} EVENT_SUBSCRIPTION_HAS_NO_PROVIDER=10 EVENT_SUBSCRIPTION_HAS_NO_PROVIDER value
 * @property {number} EVENT_SUBSCRIPTION_FOR_PATTERN_FOUND=11 EVENT_SUBSCRIPTION_FOR_PATTERN_FOUND value
 * @property {number} EVENT_SUBSCRIPTION_FOR_PATTERN_REMOVED=12 EVENT_SUBSCRIPTION_FOR_PATTERN_REMOVED value
 * @property {number} EVENT_INVALID_LISTEN_REGEX=100 EVENT_INVALID_LISTEN_REGEX value
 * @property {number} EVENT_LISTEN_RESPONSE_TIMEOUT=101 EVENT_LISTEN_RESPONSE_TIMEOUT value
 * @property {number} EVENT_LISTEN_UNSUCCESSFUL=102 EVENT_LISTEN_UNSUCCESSFUL value
 * @property {number} EVENT_MESSAGE_PERMISSION_ERROR=103 EVENT_MESSAGE_PERMISSION_ERROR value
 * @property {number} EVENT_MESSAGE_DENIED=104 EVENT_MESSAGE_DENIED value
 * @property {number} EVENT_INVALID_MESSAGE_DATA=105 EVENT_INVALID_MESSAGE_DATA value
 * @property {number} EVENT_MULTIPLE_SUBSCRIPTIONS=106 EVENT_MULTIPLE_SUBSCRIPTIONS value
 * @property {number} EVENT_NOT_SUBSCRIBED=107 EVENT_NOT_SUBSCRIBED value
 */
$root.EVENT_ACTION = (function() {
    var valuesById = {}, values = Object.create(valuesById);
    values[valuesById[0] = "EVENT_UNKNOWN"] = 0;
    values[valuesById[1] = "EVENT_ERROR"] = 1;
    values[valuesById[2] = "EVENT_EMIT"] = 2;
    values[valuesById[3] = "EVENT_SUBSCRIBE"] = 3;
    values[valuesById[4] = "EVENT_UNSUBSCRIBE"] = 4;
    values[valuesById[5] = "EVENT_LISTEN"] = 5;
    values[valuesById[6] = "EVENT_UNLISTEN"] = 6;
    values[valuesById[7] = "EVENT_LISTEN_ACCEPT"] = 7;
    values[valuesById[8] = "EVENT_LISTEN_REJECT"] = 8;
    values[valuesById[9] = "EVENT_SUBSCRIPTION_HAS_PROVIDER"] = 9;
    values[valuesById[10] = "EVENT_SUBSCRIPTION_HAS_NO_PROVIDER"] = 10;
    values[valuesById[11] = "EVENT_SUBSCRIPTION_FOR_PATTERN_FOUND"] = 11;
    values[valuesById[12] = "EVENT_SUBSCRIPTION_FOR_PATTERN_REMOVED"] = 12;
    values[valuesById[100] = "EVENT_INVALID_LISTEN_REGEX"] = 100;
    values[valuesById[101] = "EVENT_LISTEN_RESPONSE_TIMEOUT"] = 101;
    values[valuesById[102] = "EVENT_LISTEN_UNSUCCESSFUL"] = 102;
    values[valuesById[103] = "EVENT_MESSAGE_PERMISSION_ERROR"] = 103;
    values[valuesById[104] = "EVENT_MESSAGE_DENIED"] = 104;
    values[valuesById[105] = "EVENT_INVALID_MESSAGE_DATA"] = 105;
    values[valuesById[106] = "EVENT_MULTIPLE_SUBSCRIPTIONS"] = 106;
    values[valuesById[107] = "EVENT_NOT_SUBSCRIBED"] = 107;
    return values;
})();

$root.EventMessage = (function() {

    /**
     * Properties of an EventMessage.
     * @exports IEventMessage
     * @interface IEventMessage
     * @property {EVENT_ACTION|null} [action] EventMessage action
     * @property {string|null} [data] EventMessage data
     * @property {string|null} [correlationId] EventMessage correlationId
     * @property {boolean|null} [isError] EventMessage isError
     * @property {boolean|null} [isAck] EventMessage isAck
     * @property {string|null} [name] EventMessage name
     * @property {Array.<string>|null} [names] EventMessage names
     * @property {string|null} [subscription] EventMessage subscription
     * @property {TOPIC|null} [originalTOPIC] EventMessage originalTOPIC
     * @property {EVENT_ACTION|null} [originalAction] EventMessage originalAction
     */

    /**
     * Constructs a new EventMessage.
     * @exports EventMessage
     * @classdesc Represents an EventMessage.
     * @implements IEventMessage
     * @constructor
     * @param {IEventMessage=} [properties] Properties to set
     */
    function EventMessage(properties) {
        this.names = [];
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * EventMessage action.
     * @member {EVENT_ACTION} action
     * @memberof EventMessage
     * @instance
     */
    EventMessage.prototype.action = 0;

    /**
     * EventMessage data.
     * @member {string} data
     * @memberof EventMessage
     * @instance
     */
    EventMessage.prototype.data = "";

    /**
     * EventMessage correlationId.
     * @member {string} correlationId
     * @memberof EventMessage
     * @instance
     */
    EventMessage.prototype.correlationId = "";

    /**
     * EventMessage isError.
     * @member {boolean} isError
     * @memberof EventMessage
     * @instance
     */
    EventMessage.prototype.isError = false;

    /**
     * EventMessage isAck.
     * @member {boolean} isAck
     * @memberof EventMessage
     * @instance
     */
    EventMessage.prototype.isAck = false;

    /**
     * EventMessage name.
     * @member {string} name
     * @memberof EventMessage
     * @instance
     */
    EventMessage.prototype.name = "";

    /**
     * EventMessage names.
     * @member {Array.<string>} names
     * @memberof EventMessage
     * @instance
     */
    EventMessage.prototype.names = $util.emptyArray;

    /**
     * EventMessage subscription.
     * @member {string} subscription
     * @memberof EventMessage
     * @instance
     */
    EventMessage.prototype.subscription = "";

    /**
     * EventMessage originalTOPIC.
     * @member {TOPIC} originalTOPIC
     * @memberof EventMessage
     * @instance
     */
    EventMessage.prototype.originalTOPIC = 0;

    /**
     * EventMessage originalAction.
     * @member {EVENT_ACTION} originalAction
     * @memberof EventMessage
     * @instance
     */
    EventMessage.prototype.originalAction = 0;

    /**
     * Encodes the specified EventMessage message. Does not implicitly {@link EventMessage.verify|verify} messages.
     * @function encode
     * @memberof EventMessage
     * @static
     * @param {IEventMessage} message EventMessage message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    EventMessage.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.action != null && Object.hasOwnProperty.call(message, "action"))
            writer.uint32(/* id 1, wireType 0 =*/8).int32(message.action);
        if (message.data != null && Object.hasOwnProperty.call(message, "data"))
            writer.uint32(/* id 2, wireType 2 =*/18).string(message.data);
        if (message.correlationId != null && Object.hasOwnProperty.call(message, "correlationId"))
            writer.uint32(/* id 3, wireType 2 =*/26).string(message.correlationId);
        if (message.isError != null && Object.hasOwnProperty.call(message, "isError"))
            writer.uint32(/* id 4, wireType 0 =*/32).bool(message.isError);
        if (message.isAck != null && Object.hasOwnProperty.call(message, "isAck"))
            writer.uint32(/* id 5, wireType 0 =*/40).bool(message.isAck);
        if (message.name != null && Object.hasOwnProperty.call(message, "name"))
            writer.uint32(/* id 6, wireType 2 =*/50).string(message.name);
        if (message.names != null && message.names.length)
            for (var i = 0; i < message.names.length; ++i)
                writer.uint32(/* id 7, wireType 2 =*/58).string(message.names[i]);
        if (message.subscription != null && Object.hasOwnProperty.call(message, "subscription"))
            writer.uint32(/* id 8, wireType 2 =*/66).string(message.subscription);
        if (message.originalTOPIC != null && Object.hasOwnProperty.call(message, "originalTOPIC"))
            writer.uint32(/* id 10, wireType 0 =*/80).int32(message.originalTOPIC);
        if (message.originalAction != null && Object.hasOwnProperty.call(message, "originalAction"))
            writer.uint32(/* id 11, wireType 0 =*/88).int32(message.originalAction);
        return writer;
    };

    /**
     * Encodes the specified EventMessage message, length delimited. Does not implicitly {@link EventMessage.verify|verify} messages.
     * @function encodeDelimited
     * @memberof EventMessage
     * @static
     * @param {IEventMessage} message EventMessage message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    EventMessage.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes an EventMessage message from the specified reader or buffer.
     * @function decode
     * @memberof EventMessage
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {EventMessage} EventMessage
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    EventMessage.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.EventMessage();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.action = reader.int32();
                break;
            case 2:
                message.data = reader.string();
                break;
            case 3:
                message.correlationId = reader.string();
                break;
            case 4:
                message.isError = reader.bool();
                break;
            case 5:
                message.isAck = reader.bool();
                break;
            case 6:
                message.name = reader.string();
                break;
            case 7:
                if (!(message.names && message.names.length))
                    message.names = [];
                message.names.push(reader.string());
                break;
            case 8:
                message.subscription = reader.string();
                break;
            case 10:
                message.originalTOPIC = reader.int32();
                break;
            case 11:
                message.originalAction = reader.int32();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes an EventMessage message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof EventMessage
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {EventMessage} EventMessage
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    EventMessage.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    return EventMessage;
})();

/**
 * TOPIC enum.
 * @exports TOPIC
 * @enum {number}
 * @property {number} UNKNOWN=0 UNKNOWN value
 * @property {number} PARSER=1 PARSER value
 * @property {number} CONNECTION=2 CONNECTION value
 * @property {number} AUTH=3 AUTH value
 * @property {number} EVENT=4 EVENT value
 * @property {number} RECORD=5 RECORD value
 * @property {number} RPC=6 RPC value
 * @property {number} PRESENCE=7 PRESENCE value
 * @property {number} MONITORING=8 MONITORING value
 * @property {number} CLUSTER=9 CLUSTER value
 * @property {number} LOCK=10 LOCK value
 * @property {number} STATE_REGISTRY=11 STATE_REGISTRY value
 * @property {number} ERROR=100 ERROR value
 */
$root.TOPIC = (function() {
    var valuesById = {}, values = Object.create(valuesById);
    values[valuesById[0] = "UNKNOWN"] = 0;
    values[valuesById[1] = "PARSER"] = 1;
    values[valuesById[2] = "CONNECTION"] = 2;
    values[valuesById[3] = "AUTH"] = 3;
    values[valuesById[4] = "EVENT"] = 4;
    values[valuesById[5] = "RECORD"] = 5;
    values[valuesById[6] = "RPC"] = 6;
    values[valuesById[7] = "PRESENCE"] = 7;
    values[valuesById[8] = "MONITORING"] = 8;
    values[valuesById[9] = "CLUSTER"] = 9;
    values[valuesById[10] = "LOCK"] = 10;
    values[valuesById[11] = "STATE_REGISTRY"] = 11;
    values[valuesById[100] = "ERROR"] = 100;
    return values;
})();

$root.Message = (function() {

    /**
     * Properties of a Message.
     * @exports IMessage
     * @interface IMessage
     * @property {TOPIC|null} [topic] Message topic
     * @property {Uint8Array|null} [message] Message message
     */

    /**
     * Constructs a new Message.
     * @exports Message
     * @classdesc Represents a Message.
     * @implements IMessage
     * @constructor
     * @param {IMessage=} [properties] Properties to set
     */
    function Message(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * Message topic.
     * @member {TOPIC} topic
     * @memberof Message
     * @instance
     */
    Message.prototype.topic = 0;

    /**
     * Message message.
     * @member {Uint8Array} message
     * @memberof Message
     * @instance
     */
    Message.prototype.message = $util.newBuffer([]);

    /**
     * Encodes the specified Message message. Does not implicitly {@link Message.verify|verify} messages.
     * @function encode
     * @memberof Message
     * @static
     * @param {IMessage} message Message message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Message.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.topic != null && Object.hasOwnProperty.call(message, "topic"))
            writer.uint32(/* id 2, wireType 0 =*/16).int32(message.topic);
        if (message.message != null && Object.hasOwnProperty.call(message, "message"))
            writer.uint32(/* id 3, wireType 2 =*/26).bytes(message.message);
        return writer;
    };

    /**
     * Encodes the specified Message message, length delimited. Does not implicitly {@link Message.verify|verify} messages.
     * @function encodeDelimited
     * @memberof Message
     * @static
     * @param {IMessage} message Message message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Message.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a Message message from the specified reader or buffer.
     * @function decode
     * @memberof Message
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {Message} Message
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Message.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Message();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 2:
                message.topic = reader.int32();
                break;
            case 3:
                message.message = reader.bytes();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a Message message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof Message
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {Message} Message
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Message.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    return Message;
})();

/**
 * LOCK_ACTION enum.
 * @exports LOCK_ACTION
 * @enum {number}
 * @property {number} LOCK_UNKNOWN=0 LOCK_UNKNOWN value
 * @property {number} LOCK_ERROR=1 LOCK_ERROR value
 * @property {number} LOCK_REQUEST=2 LOCK_REQUEST value
 * @property {number} LOCK_RESPONSE=3 LOCK_RESPONSE value
 * @property {number} LOCK_RELEASE=4 LOCK_RELEASE value
 */
$root.LOCK_ACTION = (function() {
    var valuesById = {}, values = Object.create(valuesById);
    values[valuesById[0] = "LOCK_UNKNOWN"] = 0;
    values[valuesById[1] = "LOCK_ERROR"] = 1;
    values[valuesById[2] = "LOCK_REQUEST"] = 2;
    values[valuesById[3] = "LOCK_RESPONSE"] = 3;
    values[valuesById[4] = "LOCK_RELEASE"] = 4;
    return values;
})();

$root.LockMessage = (function() {

    /**
     * Properties of a LockMessage.
     * @exports ILockMessage
     * @interface ILockMessage
     * @property {LOCK_ACTION|null} [action] LockMessage action
     * @property {boolean|null} [locked] LockMessage locked
     */

    /**
     * Constructs a new LockMessage.
     * @exports LockMessage
     * @classdesc Represents a LockMessage.
     * @implements ILockMessage
     * @constructor
     * @param {ILockMessage=} [properties] Properties to set
     */
    function LockMessage(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * LockMessage action.
     * @member {LOCK_ACTION} action
     * @memberof LockMessage
     * @instance
     */
    LockMessage.prototype.action = 0;

    /**
     * LockMessage locked.
     * @member {boolean} locked
     * @memberof LockMessage
     * @instance
     */
    LockMessage.prototype.locked = false;

    /**
     * Encodes the specified LockMessage message. Does not implicitly {@link LockMessage.verify|verify} messages.
     * @function encode
     * @memberof LockMessage
     * @static
     * @param {ILockMessage} message LockMessage message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    LockMessage.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.action != null && Object.hasOwnProperty.call(message, "action"))
            writer.uint32(/* id 1, wireType 0 =*/8).int32(message.action);
        if (message.locked != null && Object.hasOwnProperty.call(message, "locked"))
            writer.uint32(/* id 3, wireType 0 =*/24).bool(message.locked);
        return writer;
    };

    /**
     * Encodes the specified LockMessage message, length delimited. Does not implicitly {@link LockMessage.verify|verify} messages.
     * @function encodeDelimited
     * @memberof LockMessage
     * @static
     * @param {ILockMessage} message LockMessage message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    LockMessage.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a LockMessage message from the specified reader or buffer.
     * @function decode
     * @memberof LockMessage
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {LockMessage} LockMessage
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    LockMessage.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.LockMessage();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.action = reader.int32();
                break;
            case 3:
                message.locked = reader.bool();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a LockMessage message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof LockMessage
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {LockMessage} LockMessage
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    LockMessage.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    return LockMessage;
})();

/**
 * MONITORING_ACTION enum.
 * @exports MONITORING_ACTION
 * @enum {number}
 * @property {number} MONITORING_UNKNOWN=0 MONITORING_UNKNOWN value
 */
$root.MONITORING_ACTION = (function() {
    var valuesById = {}, values = Object.create(valuesById);
    values[valuesById[0] = "MONITORING_UNKNOWN"] = 0;
    return values;
})();

$root.MonitoringMessage = (function() {

    /**
     * Properties of a MonitoringMessage.
     * @exports IMonitoringMessage
     * @interface IMonitoringMessage
     * @property {MONITORING_ACTION|null} [action] MonitoringMessage action
     * @property {string|null} [data] MonitoringMessage data
     * @property {string|null} [correlationId] MonitoringMessage correlationId
     * @property {boolean|null} [isError] MonitoringMessage isError
     * @property {boolean|null} [isAck] MonitoringMessage isAck
     */

    /**
     * Constructs a new MonitoringMessage.
     * @exports MonitoringMessage
     * @classdesc Represents a MonitoringMessage.
     * @implements IMonitoringMessage
     * @constructor
     * @param {IMonitoringMessage=} [properties] Properties to set
     */
    function MonitoringMessage(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * MonitoringMessage action.
     * @member {MONITORING_ACTION} action
     * @memberof MonitoringMessage
     * @instance
     */
    MonitoringMessage.prototype.action = 0;

    /**
     * MonitoringMessage data.
     * @member {string} data
     * @memberof MonitoringMessage
     * @instance
     */
    MonitoringMessage.prototype.data = "";

    /**
     * MonitoringMessage correlationId.
     * @member {string} correlationId
     * @memberof MonitoringMessage
     * @instance
     */
    MonitoringMessage.prototype.correlationId = "";

    /**
     * MonitoringMessage isError.
     * @member {boolean} isError
     * @memberof MonitoringMessage
     * @instance
     */
    MonitoringMessage.prototype.isError = false;

    /**
     * MonitoringMessage isAck.
     * @member {boolean} isAck
     * @memberof MonitoringMessage
     * @instance
     */
    MonitoringMessage.prototype.isAck = false;

    /**
     * Encodes the specified MonitoringMessage message. Does not implicitly {@link MonitoringMessage.verify|verify} messages.
     * @function encode
     * @memberof MonitoringMessage
     * @static
     * @param {IMonitoringMessage} message MonitoringMessage message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    MonitoringMessage.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.action != null && Object.hasOwnProperty.call(message, "action"))
            writer.uint32(/* id 1, wireType 0 =*/8).int32(message.action);
        if (message.data != null && Object.hasOwnProperty.call(message, "data"))
            writer.uint32(/* id 2, wireType 2 =*/18).string(message.data);
        if (message.correlationId != null && Object.hasOwnProperty.call(message, "correlationId"))
            writer.uint32(/* id 3, wireType 2 =*/26).string(message.correlationId);
        if (message.isError != null && Object.hasOwnProperty.call(message, "isError"))
            writer.uint32(/* id 4, wireType 0 =*/32).bool(message.isError);
        if (message.isAck != null && Object.hasOwnProperty.call(message, "isAck"))
            writer.uint32(/* id 5, wireType 0 =*/40).bool(message.isAck);
        return writer;
    };

    /**
     * Encodes the specified MonitoringMessage message, length delimited. Does not implicitly {@link MonitoringMessage.verify|verify} messages.
     * @function encodeDelimited
     * @memberof MonitoringMessage
     * @static
     * @param {IMonitoringMessage} message MonitoringMessage message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    MonitoringMessage.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a MonitoringMessage message from the specified reader or buffer.
     * @function decode
     * @memberof MonitoringMessage
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {MonitoringMessage} MonitoringMessage
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    MonitoringMessage.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.MonitoringMessage();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.action = reader.int32();
                break;
            case 2:
                message.data = reader.string();
                break;
            case 3:
                message.correlationId = reader.string();
                break;
            case 4:
                message.isError = reader.bool();
                break;
            case 5:
                message.isAck = reader.bool();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a MonitoringMessage message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof MonitoringMessage
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {MonitoringMessage} MonitoringMessage
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    MonitoringMessage.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    return MonitoringMessage;
})();

/**
 * PARSER_ACTION enum.
 * @exports PARSER_ACTION
 * @enum {number}
 * @property {number} PARSER_UNKNOWN=0 PARSER_UNKNOWN value
 * @property {number} PARSER_UNKNOWN_TOPIC=1 PARSER_UNKNOWN_TOPIC value
 * @property {number} PARSER_UNKNOWN_ACTION=2 PARSER_UNKNOWN_ACTION value
 * @property {number} PARSER_INVALID_MESSAGE=3 PARSER_INVALID_MESSAGE value
 * @property {number} PARSER_MESSAGE_PARSE_ERROR=4 PARSER_MESSAGE_PARSE_ERROR value
 * @property {number} PARSER_MAXIMUM_MESSAGE_SIZE_EXCEEDED=5 PARSER_MAXIMUM_MESSAGE_SIZE_EXCEEDED value
 * @property {number} PARSER_ERROR=6 PARSER_ERROR value
 * @property {number} PARSER_INVALID_META_PARAMS=7 PARSER_INVALID_META_PARAMS value
 */
$root.PARSER_ACTION = (function() {
    var valuesById = {}, values = Object.create(valuesById);
    values[valuesById[0] = "PARSER_UNKNOWN"] = 0;
    values[valuesById[1] = "PARSER_UNKNOWN_TOPIC"] = 1;
    values[valuesById[2] = "PARSER_UNKNOWN_ACTION"] = 2;
    values[valuesById[3] = "PARSER_INVALID_MESSAGE"] = 3;
    values[valuesById[4] = "PARSER_MESSAGE_PARSE_ERROR"] = 4;
    values[valuesById[5] = "PARSER_MAXIMUM_MESSAGE_SIZE_EXCEEDED"] = 5;
    values[valuesById[6] = "PARSER_ERROR"] = 6;
    values[valuesById[7] = "PARSER_INVALID_META_PARAMS"] = 7;
    return values;
})();

$root.ParserMessage = (function() {

    /**
     * Properties of a ParserMessage.
     * @exports IParserMessage
     * @interface IParserMessage
     * @property {PARSER_ACTION|null} [action] ParserMessage action
     * @property {string|null} [data] ParserMessage data
     * @property {TOPIC|null} [originalTOPIC] ParserMessage originalTOPIC
     * @property {number|null} [originalAction] ParserMessage originalAction
     */

    /**
     * Constructs a new ParserMessage.
     * @exports ParserMessage
     * @classdesc Represents a ParserMessage.
     * @implements IParserMessage
     * @constructor
     * @param {IParserMessage=} [properties] Properties to set
     */
    function ParserMessage(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * ParserMessage action.
     * @member {PARSER_ACTION} action
     * @memberof ParserMessage
     * @instance
     */
    ParserMessage.prototype.action = 0;

    /**
     * ParserMessage data.
     * @member {string} data
     * @memberof ParserMessage
     * @instance
     */
    ParserMessage.prototype.data = "";

    /**
     * ParserMessage originalTOPIC.
     * @member {TOPIC} originalTOPIC
     * @memberof ParserMessage
     * @instance
     */
    ParserMessage.prototype.originalTOPIC = 0;

    /**
     * ParserMessage originalAction.
     * @member {number} originalAction
     * @memberof ParserMessage
     * @instance
     */
    ParserMessage.prototype.originalAction = 0;

    /**
     * Encodes the specified ParserMessage message. Does not implicitly {@link ParserMessage.verify|verify} messages.
     * @function encode
     * @memberof ParserMessage
     * @static
     * @param {IParserMessage} message ParserMessage message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    ParserMessage.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.action != null && Object.hasOwnProperty.call(message, "action"))
            writer.uint32(/* id 1, wireType 0 =*/8).int32(message.action);
        if (message.data != null && Object.hasOwnProperty.call(message, "data"))
            writer.uint32(/* id 2, wireType 2 =*/18).string(message.data);
        if (message.originalTOPIC != null && Object.hasOwnProperty.call(message, "originalTOPIC"))
            writer.uint32(/* id 8, wireType 0 =*/64).int32(message.originalTOPIC);
        if (message.originalAction != null && Object.hasOwnProperty.call(message, "originalAction"))
            writer.uint32(/* id 9, wireType 0 =*/72).int32(message.originalAction);
        return writer;
    };

    /**
     * Encodes the specified ParserMessage message, length delimited. Does not implicitly {@link ParserMessage.verify|verify} messages.
     * @function encodeDelimited
     * @memberof ParserMessage
     * @static
     * @param {IParserMessage} message ParserMessage message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    ParserMessage.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a ParserMessage message from the specified reader or buffer.
     * @function decode
     * @memberof ParserMessage
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {ParserMessage} ParserMessage
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    ParserMessage.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.ParserMessage();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.action = reader.int32();
                break;
            case 2:
                message.data = reader.string();
                break;
            case 8:
                message.originalTOPIC = reader.int32();
                break;
            case 9:
                message.originalAction = reader.int32();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a ParserMessage message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof ParserMessage
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {ParserMessage} ParserMessage
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    ParserMessage.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    return ParserMessage;
})();

/**
 * PRESENCE_ACTION enum.
 * @exports PRESENCE_ACTION
 * @enum {number}
 * @property {number} PRESENCE_UNKNOWN=0 PRESENCE_UNKNOWN value
 * @property {number} PRESENCE_ERROR=1 PRESENCE_ERROR value
 * @property {number} PRESENCE_QUERY_ALL=2 PRESENCE_QUERY_ALL value
 * @property {number} PRESENCE_QUERY_ALL_RESPONSE=3 PRESENCE_QUERY_ALL_RESPONSE value
 * @property {number} PRESENCE_QUERY=4 PRESENCE_QUERY value
 * @property {number} PRESENCE_QUERY_RESPONSE=5 PRESENCE_QUERY_RESPONSE value
 * @property {number} PRESENCE_PRESENCE_JOIN=6 PRESENCE_PRESENCE_JOIN value
 * @property {number} PRESENCE_PRESENCE_JOIN_ALL=7 PRESENCE_PRESENCE_JOIN_ALL value
 * @property {number} PRESENCE_PRESENCE_LEAVE=8 PRESENCE_PRESENCE_LEAVE value
 * @property {number} PRESENCE_PRESENCE_LEAVE_ALL=9 PRESENCE_PRESENCE_LEAVE_ALL value
 * @property {number} PRESENCE_SUBSCRIBE=10 PRESENCE_SUBSCRIBE value
 * @property {number} PRESENCE_UNSUBSCRIBE=11 PRESENCE_UNSUBSCRIBE value
 * @property {number} PRESENCE_SUBSCRIBE_ALL=12 PRESENCE_SUBSCRIBE_ALL value
 * @property {number} PRESENCE_UNSUBSCRIBE_ALL=13 PRESENCE_UNSUBSCRIBE_ALL value
 * @property {number} PRESENCE_INVALID_PRESENCE_USERS=100 PRESENCE_INVALID_PRESENCE_USERS value
 * @property {number} PRESENCE_MESSAGE_PERMISSION_ERROR=101 PRESENCE_MESSAGE_PERMISSION_ERROR value
 * @property {number} PRESENCE_MESSAGE_DENIED=102 PRESENCE_MESSAGE_DENIED value
 * @property {number} PRESENCE_MULTIPLE_SUBSCRIPTIONS=103 PRESENCE_MULTIPLE_SUBSCRIPTIONS value
 * @property {number} PRESENCE_NOT_SUBSCRIBED=104 PRESENCE_NOT_SUBSCRIBED value
 */
$root.PRESENCE_ACTION = (function() {
    var valuesById = {}, values = Object.create(valuesById);
    values[valuesById[0] = "PRESENCE_UNKNOWN"] = 0;
    values[valuesById[1] = "PRESENCE_ERROR"] = 1;
    values[valuesById[2] = "PRESENCE_QUERY_ALL"] = 2;
    values[valuesById[3] = "PRESENCE_QUERY_ALL_RESPONSE"] = 3;
    values[valuesById[4] = "PRESENCE_QUERY"] = 4;
    values[valuesById[5] = "PRESENCE_QUERY_RESPONSE"] = 5;
    values[valuesById[6] = "PRESENCE_PRESENCE_JOIN"] = 6;
    values[valuesById[7] = "PRESENCE_PRESENCE_JOIN_ALL"] = 7;
    values[valuesById[8] = "PRESENCE_PRESENCE_LEAVE"] = 8;
    values[valuesById[9] = "PRESENCE_PRESENCE_LEAVE_ALL"] = 9;
    values[valuesById[10] = "PRESENCE_SUBSCRIBE"] = 10;
    values[valuesById[11] = "PRESENCE_UNSUBSCRIBE"] = 11;
    values[valuesById[12] = "PRESENCE_SUBSCRIBE_ALL"] = 12;
    values[valuesById[13] = "PRESENCE_UNSUBSCRIBE_ALL"] = 13;
    values[valuesById[100] = "PRESENCE_INVALID_PRESENCE_USERS"] = 100;
    values[valuesById[101] = "PRESENCE_MESSAGE_PERMISSION_ERROR"] = 101;
    values[valuesById[102] = "PRESENCE_MESSAGE_DENIED"] = 102;
    values[valuesById[103] = "PRESENCE_MULTIPLE_SUBSCRIPTIONS"] = 103;
    values[valuesById[104] = "PRESENCE_NOT_SUBSCRIBED"] = 104;
    return values;
})();

$root.PresenceMessage = (function() {

    /**
     * Properties of a PresenceMessage.
     * @exports IPresenceMessage
     * @interface IPresenceMessage
     * @property {PRESENCE_ACTION|null} [action] PresenceMessage action
     * @property {TOPIC|null} [originalTOPIC] PresenceMessage originalTOPIC
     * @property {number|null} [originalAction] PresenceMessage originalAction
     * @property {string|null} [data] PresenceMessage data
     * @property {string|null} [correlationId] PresenceMessage correlationId
     * @property {boolean|null} [isError] PresenceMessage isError
     * @property {boolean|null} [isAck] PresenceMessage isAck
     * @property {string|null} [name] PresenceMessage name
     * @property {Array.<string>|null} [names] PresenceMessage names
     */

    /**
     * Constructs a new PresenceMessage.
     * @exports PresenceMessage
     * @classdesc Represents a PresenceMessage.
     * @implements IPresenceMessage
     * @constructor
     * @param {IPresenceMessage=} [properties] Properties to set
     */
    function PresenceMessage(properties) {
        this.names = [];
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * PresenceMessage action.
     * @member {PRESENCE_ACTION} action
     * @memberof PresenceMessage
     * @instance
     */
    PresenceMessage.prototype.action = 0;

    /**
     * PresenceMessage originalTOPIC.
     * @member {TOPIC} originalTOPIC
     * @memberof PresenceMessage
     * @instance
     */
    PresenceMessage.prototype.originalTOPIC = 0;

    /**
     * PresenceMessage originalAction.
     * @member {number} originalAction
     * @memberof PresenceMessage
     * @instance
     */
    PresenceMessage.prototype.originalAction = 0;

    /**
     * PresenceMessage data.
     * @member {string} data
     * @memberof PresenceMessage
     * @instance
     */
    PresenceMessage.prototype.data = "";

    /**
     * PresenceMessage correlationId.
     * @member {string} correlationId
     * @memberof PresenceMessage
     * @instance
     */
    PresenceMessage.prototype.correlationId = "";

    /**
     * PresenceMessage isError.
     * @member {boolean} isError
     * @memberof PresenceMessage
     * @instance
     */
    PresenceMessage.prototype.isError = false;

    /**
     * PresenceMessage isAck.
     * @member {boolean} isAck
     * @memberof PresenceMessage
     * @instance
     */
    PresenceMessage.prototype.isAck = false;

    /**
     * PresenceMessage name.
     * @member {string} name
     * @memberof PresenceMessage
     * @instance
     */
    PresenceMessage.prototype.name = "";

    /**
     * PresenceMessage names.
     * @member {Array.<string>} names
     * @memberof PresenceMessage
     * @instance
     */
    PresenceMessage.prototype.names = $util.emptyArray;

    /**
     * Encodes the specified PresenceMessage message. Does not implicitly {@link PresenceMessage.verify|verify} messages.
     * @function encode
     * @memberof PresenceMessage
     * @static
     * @param {IPresenceMessage} message PresenceMessage message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    PresenceMessage.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.action != null && Object.hasOwnProperty.call(message, "action"))
            writer.uint32(/* id 1, wireType 0 =*/8).int32(message.action);
        if (message.originalTOPIC != null && Object.hasOwnProperty.call(message, "originalTOPIC"))
            writer.uint32(/* id 2, wireType 0 =*/16).int32(message.originalTOPIC);
        if (message.originalAction != null && Object.hasOwnProperty.call(message, "originalAction"))
            writer.uint32(/* id 3, wireType 0 =*/24).int32(message.originalAction);
        if (message.data != null && Object.hasOwnProperty.call(message, "data"))
            writer.uint32(/* id 4, wireType 2 =*/34).string(message.data);
        if (message.correlationId != null && Object.hasOwnProperty.call(message, "correlationId"))
            writer.uint32(/* id 5, wireType 2 =*/42).string(message.correlationId);
        if (message.isError != null && Object.hasOwnProperty.call(message, "isError"))
            writer.uint32(/* id 6, wireType 0 =*/48).bool(message.isError);
        if (message.isAck != null && Object.hasOwnProperty.call(message, "isAck"))
            writer.uint32(/* id 7, wireType 0 =*/56).bool(message.isAck);
        if (message.name != null && Object.hasOwnProperty.call(message, "name"))
            writer.uint32(/* id 8, wireType 2 =*/66).string(message.name);
        if (message.names != null && message.names.length)
            for (var i = 0; i < message.names.length; ++i)
                writer.uint32(/* id 9, wireType 2 =*/74).string(message.names[i]);
        return writer;
    };

    /**
     * Encodes the specified PresenceMessage message, length delimited. Does not implicitly {@link PresenceMessage.verify|verify} messages.
     * @function encodeDelimited
     * @memberof PresenceMessage
     * @static
     * @param {IPresenceMessage} message PresenceMessage message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    PresenceMessage.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a PresenceMessage message from the specified reader or buffer.
     * @function decode
     * @memberof PresenceMessage
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {PresenceMessage} PresenceMessage
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    PresenceMessage.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.PresenceMessage();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.action = reader.int32();
                break;
            case 2:
                message.originalTOPIC = reader.int32();
                break;
            case 3:
                message.originalAction = reader.int32();
                break;
            case 4:
                message.data = reader.string();
                break;
            case 5:
                message.correlationId = reader.string();
                break;
            case 6:
                message.isError = reader.bool();
                break;
            case 7:
                message.isAck = reader.bool();
                break;
            case 8:
                message.name = reader.string();
                break;
            case 9:
                if (!(message.names && message.names.length))
                    message.names = [];
                message.names.push(reader.string());
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a PresenceMessage message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof PresenceMessage
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {PresenceMessage} PresenceMessage
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    PresenceMessage.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    return PresenceMessage;
})();

/**
 * RECORD_ACTION enum.
 * @exports RECORD_ACTION
 * @enum {number}
 * @property {number} RECORD_UNKNOWN=0 RECORD_UNKNOWN value
 * @property {number} RECORD_ERROR=1 RECORD_ERROR value
 * @property {number} RECORD_NOTIFY=2 RECORD_NOTIFY value
 * @property {number} RECORD_READ=3 RECORD_READ value
 * @property {number} RECORD_READ_RESPONSE=4 RECORD_READ_RESPONSE value
 * @property {number} RECORD_HEAD=5 RECORD_HEAD value
 * @property {number} RECORD_HEAD_RESPONSE=6 RECORD_HEAD_RESPONSE value
 * @property {number} RECORD_HEAD_BULK=7 RECORD_HEAD_BULK value
 * @property {number} RECORD_HEAD_RESPONSE_BULK=8 RECORD_HEAD_RESPONSE_BULK value
 * @property {number} RECORD_DELETE=9 RECORD_DELETE value
 * @property {number} RECORD_DELETE_SUCCESS=10 RECORD_DELETE_SUCCESS value
 * @property {number} RECORD_DELETE_BULK=11 RECORD_DELETE_BULK value
 * @property {number} RECORD_DELETE_BULK_SUCCESS=12 RECORD_DELETE_BULK_SUCCESS value
 * @property {number} RECORD_DELETED=13 RECORD_DELETED value
 * @property {number} RECORD_WRITE_ACKNOWLEDGEMENT=14 RECORD_WRITE_ACKNOWLEDGEMENT value
 * @property {number} RECORD_CREATE=15 RECORD_CREATE value
 * @property {number} RECORD_CREATEANDUPDATE=16 RECORD_CREATEANDUPDATE value
 * @property {number} RECORD_CREATEANDPATCH=17 RECORD_CREATEANDPATCH value
 * @property {number} RECORD_UPDATE=18 RECORD_UPDATE value
 * @property {number} RECORD_PATCH=19 RECORD_PATCH value
 * @property {number} RECORD_ERASE=20 RECORD_ERASE value
 * @property {number} RECORD_SUBSCRIBEANDHEAD=21 RECORD_SUBSCRIBEANDHEAD value
 * @property {number} RECORD_SUBSCRIBEANDREAD=22 RECORD_SUBSCRIBEANDREAD value
 * @property {number} RECORD_SUBSCRIBECREATEANDREAD=23 RECORD_SUBSCRIBECREATEANDREAD value
 * @property {number} RECORD_SUBSCRIBECREATEANDUPDATE=24 RECORD_SUBSCRIBECREATEANDUPDATE value
 * @property {number} RECORD_SUBSCRIBE=25 RECORD_SUBSCRIBE value
 * @property {number} RECORD_UNSUBSCRIBE=26 RECORD_UNSUBSCRIBE value
 * @property {number} RECORD_LISTEN=27 RECORD_LISTEN value
 * @property {number} RECORD_UNLISTEN=28 RECORD_UNLISTEN value
 * @property {number} RECORD_LISTEN_ACCEPT=29 RECORD_LISTEN_ACCEPT value
 * @property {number} RECORD_LISTEN_REJECT=30 RECORD_LISTEN_REJECT value
 * @property {number} RECORD_SUBSCRIPTION_HAS_PROVIDER=31 RECORD_SUBSCRIPTION_HAS_PROVIDER value
 * @property {number} RECORD_SUBSCRIPTION_HAS_NO_PROVIDER=32 RECORD_SUBSCRIPTION_HAS_NO_PROVIDER value
 * @property {number} RECORD_SUBSCRIPTION_FOR_PATTERN_FOUND=33 RECORD_SUBSCRIPTION_FOR_PATTERN_FOUND value
 * @property {number} RECORD_SUBSCRIPTION_FOR_PATTERN_REMOVED=34 RECORD_SUBSCRIPTION_FOR_PATTERN_REMOVED value
 * @property {number} RECORD_CACHE_RETRIEVAL_TIMEOUT=100 RECORD_CACHE_RETRIEVAL_TIMEOUT value
 * @property {number} RECORD_STORAGE_RETRIEVAL_TIMEOUT=101 RECORD_STORAGE_RETRIEVAL_TIMEOUT value
 * @property {number} RECORD_VERSION_EXISTS=102 RECORD_VERSION_EXISTS value
 * @property {number} RECORD_RECORD_LOAD_ERROR=103 RECORD_RECORD_LOAD_ERROR value
 * @property {number} RECORD_RECORD_CREATE_ERROR=104 RECORD_RECORD_CREATE_ERROR value
 * @property {number} RECORD_RECORD_UPDATE_ERROR=105 RECORD_RECORD_UPDATE_ERROR value
 * @property {number} RECORD_RECORD_DELETE_ERROR=106 RECORD_RECORD_DELETE_ERROR value
 * @property {number} RECORD_RECORD_NOT_FOUND=107 RECORD_RECORD_NOT_FOUND value
 * @property {number} RECORD_INVALID_VERSION=108 RECORD_INVALID_VERSION value
 * @property {number} RECORD_INVALID_PATCH_ON_HOTPATH=109 RECORD_INVALID_PATCH_ON_HOTPATH value
 * @property {number} RECORD_INVALID_LISTEN_REGEX=110 RECORD_INVALID_LISTEN_REGEX value
 * @property {number} RECORD_LISTEN_RESPONSE_TIMEOUT=111 RECORD_LISTEN_RESPONSE_TIMEOUT value
 * @property {number} RECORD_LISTEN_UNSUCCESSFUL=112 RECORD_LISTEN_UNSUCCESSFUL value
 * @property {number} RECORD_RECORD_NOTIFY_ERROR=113 RECORD_RECORD_NOTIFY_ERROR value
 * @property {number} RECORD_MESSAGE_PERMISSION_ERROR=114 RECORD_MESSAGE_PERMISSION_ERROR value
 * @property {number} RECORD_MESSAGE_DENIED=115 RECORD_MESSAGE_DENIED value
 * @property {number} RECORD_INVALID_MESSAGE_DATA=116 RECORD_INVALID_MESSAGE_DATA value
 * @property {number} RECORD_MULTIPLE_SUBSCRIPTIONS=117 RECORD_MULTIPLE_SUBSCRIPTIONS value
 * @property {number} RECORD_NOT_SUBSCRIBED=118 RECORD_NOT_SUBSCRIBED value
 */
$root.RECORD_ACTION = (function() {
    var valuesById = {}, values = Object.create(valuesById);
    values[valuesById[0] = "RECORD_UNKNOWN"] = 0;
    values[valuesById[1] = "RECORD_ERROR"] = 1;
    values[valuesById[2] = "RECORD_NOTIFY"] = 2;
    values[valuesById[3] = "RECORD_READ"] = 3;
    values[valuesById[4] = "RECORD_READ_RESPONSE"] = 4;
    values[valuesById[5] = "RECORD_HEAD"] = 5;
    values[valuesById[6] = "RECORD_HEAD_RESPONSE"] = 6;
    values[valuesById[7] = "RECORD_HEAD_BULK"] = 7;
    values[valuesById[8] = "RECORD_HEAD_RESPONSE_BULK"] = 8;
    values[valuesById[9] = "RECORD_DELETE"] = 9;
    values[valuesById[10] = "RECORD_DELETE_SUCCESS"] = 10;
    values[valuesById[11] = "RECORD_DELETE_BULK"] = 11;
    values[valuesById[12] = "RECORD_DELETE_BULK_SUCCESS"] = 12;
    values[valuesById[13] = "RECORD_DELETED"] = 13;
    values[valuesById[14] = "RECORD_WRITE_ACKNOWLEDGEMENT"] = 14;
    values[valuesById[15] = "RECORD_CREATE"] = 15;
    values[valuesById[16] = "RECORD_CREATEANDUPDATE"] = 16;
    values[valuesById[17] = "RECORD_CREATEANDPATCH"] = 17;
    values[valuesById[18] = "RECORD_UPDATE"] = 18;
    values[valuesById[19] = "RECORD_PATCH"] = 19;
    values[valuesById[20] = "RECORD_ERASE"] = 20;
    values[valuesById[21] = "RECORD_SUBSCRIBEANDHEAD"] = 21;
    values[valuesById[22] = "RECORD_SUBSCRIBEANDREAD"] = 22;
    values[valuesById[23] = "RECORD_SUBSCRIBECREATEANDREAD"] = 23;
    values[valuesById[24] = "RECORD_SUBSCRIBECREATEANDUPDATE"] = 24;
    values[valuesById[25] = "RECORD_SUBSCRIBE"] = 25;
    values[valuesById[26] = "RECORD_UNSUBSCRIBE"] = 26;
    values[valuesById[27] = "RECORD_LISTEN"] = 27;
    values[valuesById[28] = "RECORD_UNLISTEN"] = 28;
    values[valuesById[29] = "RECORD_LISTEN_ACCEPT"] = 29;
    values[valuesById[30] = "RECORD_LISTEN_REJECT"] = 30;
    values[valuesById[31] = "RECORD_SUBSCRIPTION_HAS_PROVIDER"] = 31;
    values[valuesById[32] = "RECORD_SUBSCRIPTION_HAS_NO_PROVIDER"] = 32;
    values[valuesById[33] = "RECORD_SUBSCRIPTION_FOR_PATTERN_FOUND"] = 33;
    values[valuesById[34] = "RECORD_SUBSCRIPTION_FOR_PATTERN_REMOVED"] = 34;
    values[valuesById[100] = "RECORD_CACHE_RETRIEVAL_TIMEOUT"] = 100;
    values[valuesById[101] = "RECORD_STORAGE_RETRIEVAL_TIMEOUT"] = 101;
    values[valuesById[102] = "RECORD_VERSION_EXISTS"] = 102;
    values[valuesById[103] = "RECORD_RECORD_LOAD_ERROR"] = 103;
    values[valuesById[104] = "RECORD_RECORD_CREATE_ERROR"] = 104;
    values[valuesById[105] = "RECORD_RECORD_UPDATE_ERROR"] = 105;
    values[valuesById[106] = "RECORD_RECORD_DELETE_ERROR"] = 106;
    values[valuesById[107] = "RECORD_RECORD_NOT_FOUND"] = 107;
    values[valuesById[108] = "RECORD_INVALID_VERSION"] = 108;
    values[valuesById[109] = "RECORD_INVALID_PATCH_ON_HOTPATH"] = 109;
    values[valuesById[110] = "RECORD_INVALID_LISTEN_REGEX"] = 110;
    values[valuesById[111] = "RECORD_LISTEN_RESPONSE_TIMEOUT"] = 111;
    values[valuesById[112] = "RECORD_LISTEN_UNSUCCESSFUL"] = 112;
    values[valuesById[113] = "RECORD_RECORD_NOTIFY_ERROR"] = 113;
    values[valuesById[114] = "RECORD_MESSAGE_PERMISSION_ERROR"] = 114;
    values[valuesById[115] = "RECORD_MESSAGE_DENIED"] = 115;
    values[valuesById[116] = "RECORD_INVALID_MESSAGE_DATA"] = 116;
    values[valuesById[117] = "RECORD_MULTIPLE_SUBSCRIPTIONS"] = 117;
    values[valuesById[118] = "RECORD_NOT_SUBSCRIBED"] = 118;
    return values;
})();

$root.RecordMessage = (function() {

    /**
     * Properties of a RecordMessage.
     * @exports IRecordMessage
     * @interface IRecordMessage
     * @property {RECORD_ACTION|null} [action] RecordMessage action
     * @property {string|null} [data] RecordMessage data
     * @property {string|null} [correlationId] RecordMessage correlationId
     * @property {boolean|null} [isError] RecordMessage isError
     * @property {boolean|null} [isAck] RecordMessage isAck
     * @property {string|null} [name] RecordMessage name
     * @property {Array.<string>|null} [names] RecordMessage names
     * @property {string|null} [pattern] RecordMessage pattern
     * @property {string|null} [subscription] RecordMessage subscription
     * @property {RECORD_ACTION|null} [originalAction] RecordMessage originalAction
     * @property {boolean|null} [isWriteAck] RecordMessage isWriteAck
     * @property {string|null} [path] RecordMessage path
     * @property {number|null} [version] RecordMessage version
     * @property {Object.<string,number>|null} [versions] RecordMessage versions
     */

    /**
     * Constructs a new RecordMessage.
     * @exports RecordMessage
     * @classdesc Represents a RecordMessage.
     * @implements IRecordMessage
     * @constructor
     * @param {IRecordMessage=} [properties] Properties to set
     */
    function RecordMessage(properties) {
        this.names = [];
        this.versions = {};
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * RecordMessage action.
     * @member {RECORD_ACTION} action
     * @memberof RecordMessage
     * @instance
     */
    RecordMessage.prototype.action = 0;

    /**
     * RecordMessage data.
     * @member {string} data
     * @memberof RecordMessage
     * @instance
     */
    RecordMessage.prototype.data = "";

    /**
     * RecordMessage correlationId.
     * @member {string} correlationId
     * @memberof RecordMessage
     * @instance
     */
    RecordMessage.prototype.correlationId = "";

    /**
     * RecordMessage isError.
     * @member {boolean} isError
     * @memberof RecordMessage
     * @instance
     */
    RecordMessage.prototype.isError = false;

    /**
     * RecordMessage isAck.
     * @member {boolean} isAck
     * @memberof RecordMessage
     * @instance
     */
    RecordMessage.prototype.isAck = false;

    /**
     * RecordMessage name.
     * @member {string} name
     * @memberof RecordMessage
     * @instance
     */
    RecordMessage.prototype.name = "";

    /**
     * RecordMessage names.
     * @member {Array.<string>} names
     * @memberof RecordMessage
     * @instance
     */
    RecordMessage.prototype.names = $util.emptyArray;

    /**
     * RecordMessage pattern.
     * @member {string} pattern
     * @memberof RecordMessage
     * @instance
     */
    RecordMessage.prototype.pattern = "";

    /**
     * RecordMessage subscription.
     * @member {string} subscription
     * @memberof RecordMessage
     * @instance
     */
    RecordMessage.prototype.subscription = "";

    /**
     * RecordMessage originalAction.
     * @member {RECORD_ACTION} originalAction
     * @memberof RecordMessage
     * @instance
     */
    RecordMessage.prototype.originalAction = 0;

    /**
     * RecordMessage isWriteAck.
     * @member {boolean} isWriteAck
     * @memberof RecordMessage
     * @instance
     */
    RecordMessage.prototype.isWriteAck = false;

    /**
     * RecordMessage path.
     * @member {string} path
     * @memberof RecordMessage
     * @instance
     */
    RecordMessage.prototype.path = "";

    /**
     * RecordMessage version.
     * @member {number} version
     * @memberof RecordMessage
     * @instance
     */
    RecordMessage.prototype.version = 0;

    /**
     * RecordMessage versions.
     * @member {Object.<string,number>} versions
     * @memberof RecordMessage
     * @instance
     */
    RecordMessage.prototype.versions = $util.emptyObject;

    /**
     * Encodes the specified RecordMessage message. Does not implicitly {@link RecordMessage.verify|verify} messages.
     * @function encode
     * @memberof RecordMessage
     * @static
     * @param {IRecordMessage} message RecordMessage message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    RecordMessage.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.action != null && Object.hasOwnProperty.call(message, "action"))
            writer.uint32(/* id 1, wireType 0 =*/8).int32(message.action);
        if (message.data != null && Object.hasOwnProperty.call(message, "data"))
            writer.uint32(/* id 2, wireType 2 =*/18).string(message.data);
        if (message.correlationId != null && Object.hasOwnProperty.call(message, "correlationId"))
            writer.uint32(/* id 3, wireType 2 =*/26).string(message.correlationId);
        if (message.isError != null && Object.hasOwnProperty.call(message, "isError"))
            writer.uint32(/* id 4, wireType 0 =*/32).bool(message.isError);
        if (message.isAck != null && Object.hasOwnProperty.call(message, "isAck"))
            writer.uint32(/* id 5, wireType 0 =*/40).bool(message.isAck);
        if (message.name != null && Object.hasOwnProperty.call(message, "name"))
            writer.uint32(/* id 6, wireType 2 =*/50).string(message.name);
        if (message.names != null && message.names.length)
            for (var i = 0; i < message.names.length; ++i)
                writer.uint32(/* id 7, wireType 2 =*/58).string(message.names[i]);
        if (message.pattern != null && Object.hasOwnProperty.call(message, "pattern"))
            writer.uint32(/* id 8, wireType 2 =*/66).string(message.pattern);
        if (message.subscription != null && Object.hasOwnProperty.call(message, "subscription"))
            writer.uint32(/* id 9, wireType 2 =*/74).string(message.subscription);
        if (message.originalAction != null && Object.hasOwnProperty.call(message, "originalAction"))
            writer.uint32(/* id 10, wireType 0 =*/80).int32(message.originalAction);
        if (message.isWriteAck != null && Object.hasOwnProperty.call(message, "isWriteAck"))
            writer.uint32(/* id 11, wireType 0 =*/88).bool(message.isWriteAck);
        if (message.path != null && Object.hasOwnProperty.call(message, "path"))
            writer.uint32(/* id 12, wireType 2 =*/98).string(message.path);
        if (message.version != null && Object.hasOwnProperty.call(message, "version"))
            writer.uint32(/* id 13, wireType 0 =*/104).int32(message.version);
        if (message.versions != null && Object.hasOwnProperty.call(message, "versions"))
            for (var keys = Object.keys(message.versions), i = 0; i < keys.length; ++i)
                writer.uint32(/* id 14, wireType 2 =*/114).fork().uint32(/* id 1, wireType 2 =*/10).string(keys[i]).uint32(/* id 2, wireType 0 =*/16).int32(message.versions[keys[i]]).ldelim();
        return writer;
    };

    /**
     * Encodes the specified RecordMessage message, length delimited. Does not implicitly {@link RecordMessage.verify|verify} messages.
     * @function encodeDelimited
     * @memberof RecordMessage
     * @static
     * @param {IRecordMessage} message RecordMessage message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    RecordMessage.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a RecordMessage message from the specified reader or buffer.
     * @function decode
     * @memberof RecordMessage
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {RecordMessage} RecordMessage
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    RecordMessage.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.RecordMessage(), key, value;
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.action = reader.int32();
                break;
            case 2:
                message.data = reader.string();
                break;
            case 3:
                message.correlationId = reader.string();
                break;
            case 4:
                message.isError = reader.bool();
                break;
            case 5:
                message.isAck = reader.bool();
                break;
            case 6:
                message.name = reader.string();
                break;
            case 7:
                if (!(message.names && message.names.length))
                    message.names = [];
                message.names.push(reader.string());
                break;
            case 8:
                message.pattern = reader.string();
                break;
            case 9:
                message.subscription = reader.string();
                break;
            case 10:
                message.originalAction = reader.int32();
                break;
            case 11:
                message.isWriteAck = reader.bool();
                break;
            case 12:
                message.path = reader.string();
                break;
            case 13:
                message.version = reader.int32();
                break;
            case 14:
                if (message.versions === $util.emptyObject)
                    message.versions = {};
                var end2 = reader.uint32() + reader.pos;
                key = "";
                value = 0;
                while (reader.pos < end2) {
                    var tag2 = reader.uint32();
                    switch (tag2 >>> 3) {
                    case 1:
                        key = reader.string();
                        break;
                    case 2:
                        value = reader.int32();
                        break;
                    default:
                        reader.skipType(tag2 & 7);
                        break;
                    }
                }
                message.versions[key] = value;
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a RecordMessage message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof RecordMessage
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {RecordMessage} RecordMessage
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    RecordMessage.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    return RecordMessage;
})();

/**
 * RPC_ACTION enum.
 * @exports RPC_ACTION
 * @enum {number}
 * @property {number} RPC_UNKNOWN=0 RPC_UNKNOWN value
 * @property {number} RPC_ERROR=1 RPC_ERROR value
 * @property {number} RPC_REQUEST=2 RPC_REQUEST value
 * @property {number} RPC_ACCEPT=4 RPC_ACCEPT value
 * @property {number} RPC_RESPONSE=5 RPC_RESPONSE value
 * @property {number} RPC_REJECT=6 RPC_REJECT value
 * @property {number} RPC_REQUEST_ERROR=7 RPC_REQUEST_ERROR value
 * @property {number} RPC_PROVIDE=8 RPC_PROVIDE value
 * @property {number} RPC_UNPROVIDE=9 RPC_UNPROVIDE value
 * @property {number} RPC_NO_RPC_PROVIDER=100 RPC_NO_RPC_PROVIDER value
 * @property {number} RPC_ACCEPT_TIMEOUT=101 RPC_ACCEPT_TIMEOUT value
 * @property {number} RPC_MULTIPLE_ACCEPT=102 RPC_MULTIPLE_ACCEPT value
 * @property {number} RPC_INVALID_RPC_CORRELATION_ID=103 RPC_INVALID_RPC_CORRELATION_ID value
 * @property {number} RPC_RESPONSE_TIMEOUT=104 RPC_RESPONSE_TIMEOUT value
 * @property {number} RPC_MULTIPLE_RESPONSE=105 RPC_MULTIPLE_RESPONSE value
 * @property {number} RPC_MESSAGE_PERMISSION_ERROR=106 RPC_MESSAGE_PERMISSION_ERROR value
 * @property {number} RPC_MESSAGE_DENIED=107 RPC_MESSAGE_DENIED value
 * @property {number} RPC_INVALID_MESSAGE_DATA=108 RPC_INVALID_MESSAGE_DATA value
 * @property {number} RPC_MULTIPLE_PROVIDERS=109 RPC_MULTIPLE_PROVIDERS value
 * @property {number} RPC_NOT_PROVIDED=110 RPC_NOT_PROVIDED value
 */
$root.RPC_ACTION = (function() {
    var valuesById = {}, values = Object.create(valuesById);
    values[valuesById[0] = "RPC_UNKNOWN"] = 0;
    values[valuesById[1] = "RPC_ERROR"] = 1;
    values[valuesById[2] = "RPC_REQUEST"] = 2;
    values[valuesById[4] = "RPC_ACCEPT"] = 4;
    values[valuesById[5] = "RPC_RESPONSE"] = 5;
    values[valuesById[6] = "RPC_REJECT"] = 6;
    values[valuesById[7] = "RPC_REQUEST_ERROR"] = 7;
    values[valuesById[8] = "RPC_PROVIDE"] = 8;
    values[valuesById[9] = "RPC_UNPROVIDE"] = 9;
    values[valuesById[100] = "RPC_NO_RPC_PROVIDER"] = 100;
    values[valuesById[101] = "RPC_ACCEPT_TIMEOUT"] = 101;
    values[valuesById[102] = "RPC_MULTIPLE_ACCEPT"] = 102;
    values[valuesById[103] = "RPC_INVALID_RPC_CORRELATION_ID"] = 103;
    values[valuesById[104] = "RPC_RESPONSE_TIMEOUT"] = 104;
    values[valuesById[105] = "RPC_MULTIPLE_RESPONSE"] = 105;
    values[valuesById[106] = "RPC_MESSAGE_PERMISSION_ERROR"] = 106;
    values[valuesById[107] = "RPC_MESSAGE_DENIED"] = 107;
    values[valuesById[108] = "RPC_INVALID_MESSAGE_DATA"] = 108;
    values[valuesById[109] = "RPC_MULTIPLE_PROVIDERS"] = 109;
    values[valuesById[110] = "RPC_NOT_PROVIDED"] = 110;
    return values;
})();

$root.RpcMessage = (function() {

    /**
     * Properties of a RpcMessage.
     * @exports IRpcMessage
     * @interface IRpcMessage
     * @property {RPC_ACTION|null} [action] RpcMessage action
     * @property {string|null} [data] RpcMessage data
     * @property {string|null} [correlationId] RpcMessage correlationId
     * @property {boolean|null} [isError] RpcMessage isError
     * @property {boolean|null} [isAck] RpcMessage isAck
     * @property {Array.<string>|null} [names] RpcMessage names
     * @property {string|null} [name] RpcMessage name
     * @property {number|null} [originalAction] RpcMessage originalAction
     * @property {string|null} [requestorName] RpcMessage requestorName
     * @property {string|null} [requestorData] RpcMessage requestorData
     */

    /**
     * Constructs a new RpcMessage.
     * @exports RpcMessage
     * @classdesc Represents a RpcMessage.
     * @implements IRpcMessage
     * @constructor
     * @param {IRpcMessage=} [properties] Properties to set
     */
    function RpcMessage(properties) {
        this.names = [];
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * RpcMessage action.
     * @member {RPC_ACTION} action
     * @memberof RpcMessage
     * @instance
     */
    RpcMessage.prototype.action = 0;

    /**
     * RpcMessage data.
     * @member {string} data
     * @memberof RpcMessage
     * @instance
     */
    RpcMessage.prototype.data = "";

    /**
     * RpcMessage correlationId.
     * @member {string} correlationId
     * @memberof RpcMessage
     * @instance
     */
    RpcMessage.prototype.correlationId = "";

    /**
     * RpcMessage isError.
     * @member {boolean} isError
     * @memberof RpcMessage
     * @instance
     */
    RpcMessage.prototype.isError = false;

    /**
     * RpcMessage isAck.
     * @member {boolean} isAck
     * @memberof RpcMessage
     * @instance
     */
    RpcMessage.prototype.isAck = false;

    /**
     * RpcMessage names.
     * @member {Array.<string>} names
     * @memberof RpcMessage
     * @instance
     */
    RpcMessage.prototype.names = $util.emptyArray;

    /**
     * RpcMessage name.
     * @member {string} name
     * @memberof RpcMessage
     * @instance
     */
    RpcMessage.prototype.name = "";

    /**
     * RpcMessage originalAction.
     * @member {number} originalAction
     * @memberof RpcMessage
     * @instance
     */
    RpcMessage.prototype.originalAction = 0;

    /**
     * RpcMessage requestorName.
     * @member {string} requestorName
     * @memberof RpcMessage
     * @instance
     */
    RpcMessage.prototype.requestorName = "";

    /**
     * RpcMessage requestorData.
     * @member {string} requestorData
     * @memberof RpcMessage
     * @instance
     */
    RpcMessage.prototype.requestorData = "";

    /**
     * Encodes the specified RpcMessage message. Does not implicitly {@link RpcMessage.verify|verify} messages.
     * @function encode
     * @memberof RpcMessage
     * @static
     * @param {IRpcMessage} message RpcMessage message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    RpcMessage.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.action != null && Object.hasOwnProperty.call(message, "action"))
            writer.uint32(/* id 1, wireType 0 =*/8).int32(message.action);
        if (message.data != null && Object.hasOwnProperty.call(message, "data"))
            writer.uint32(/* id 2, wireType 2 =*/18).string(message.data);
        if (message.correlationId != null && Object.hasOwnProperty.call(message, "correlationId"))
            writer.uint32(/* id 3, wireType 2 =*/26).string(message.correlationId);
        if (message.isError != null && Object.hasOwnProperty.call(message, "isError"))
            writer.uint32(/* id 4, wireType 0 =*/32).bool(message.isError);
        if (message.isAck != null && Object.hasOwnProperty.call(message, "isAck"))
            writer.uint32(/* id 5, wireType 0 =*/40).bool(message.isAck);
        if (message.names != null && message.names.length)
            for (var i = 0; i < message.names.length; ++i)
                writer.uint32(/* id 6, wireType 2 =*/50).string(message.names[i]);
        if (message.name != null && Object.hasOwnProperty.call(message, "name"))
            writer.uint32(/* id 7, wireType 2 =*/58).string(message.name);
        if (message.originalAction != null && Object.hasOwnProperty.call(message, "originalAction"))
            writer.uint32(/* id 9, wireType 0 =*/72).int32(message.originalAction);
        if (message.requestorName != null && Object.hasOwnProperty.call(message, "requestorName"))
            writer.uint32(/* id 10, wireType 2 =*/82).string(message.requestorName);
        if (message.requestorData != null && Object.hasOwnProperty.call(message, "requestorData"))
            writer.uint32(/* id 11, wireType 2 =*/90).string(message.requestorData);
        return writer;
    };

    /**
     * Encodes the specified RpcMessage message, length delimited. Does not implicitly {@link RpcMessage.verify|verify} messages.
     * @function encodeDelimited
     * @memberof RpcMessage
     * @static
     * @param {IRpcMessage} message RpcMessage message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    RpcMessage.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a RpcMessage message from the specified reader or buffer.
     * @function decode
     * @memberof RpcMessage
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {RpcMessage} RpcMessage
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    RpcMessage.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.RpcMessage();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.action = reader.int32();
                break;
            case 2:
                message.data = reader.string();
                break;
            case 3:
                message.correlationId = reader.string();
                break;
            case 4:
                message.isError = reader.bool();
                break;
            case 5:
                message.isAck = reader.bool();
                break;
            case 6:
                if (!(message.names && message.names.length))
                    message.names = [];
                message.names.push(reader.string());
                break;
            case 7:
                message.name = reader.string();
                break;
            case 9:
                message.originalAction = reader.int32();
                break;
            case 10:
                message.requestorName = reader.string();
                break;
            case 11:
                message.requestorData = reader.string();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a RpcMessage message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof RpcMessage
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {RpcMessage} RpcMessage
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    RpcMessage.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    return RpcMessage;
})();

/**
 * STATE_REGISTRY_TOPIC enum.
 * @exports STATE_REGISTRY_TOPIC
 * @enum {number}
 * @property {number} STATE_REGISTRY_UNKNOWN=0 STATE_REGISTRY_UNKNOWN value
 * @property {number} STATE_REGISTRY_EVENT_SUBSCRIPTIONS=11 STATE_REGISTRY_EVENT_SUBSCRIPTIONS value
 * @property {number} STATE_REGISTRY_RECORD_SUBSCRIPTIONS=12 STATE_REGISTRY_RECORD_SUBSCRIPTIONS value
 * @property {number} STATE_REGISTRY_SUBSCRIPTIONS=9 STATE_REGISTRY_SUBSCRIPTIONS value
 * @property {number} STATE_REGISTRY_ONLINE_USERS=10 STATE_REGISTRY_ONLINE_USERS value
 * @property {number} STATE_REGISTRY_MONITORING_SUBSCRIPTIONS=24 STATE_REGISTRY_MONITORING_SUBSCRIPTIONS value
 * @property {number} STATE_REGISTRY_RPC_SUBSCRIPTIONS=13 STATE_REGISTRY_RPC_SUBSCRIPTIONS value
 * @property {number} STATE_REGISTRY_PRESENCE_SUBSCRIPTIONS=14 STATE_REGISTRY_PRESENCE_SUBSCRIPTIONS value
 * @property {number} STATE_REGISTRY_RECORD_LISTEN_PATTERNS=15 STATE_REGISTRY_RECORD_LISTEN_PATTERNS value
 * @property {number} STATE_REGISTRY_EVENT_LISTEN_PATTERNS=16 STATE_REGISTRY_EVENT_LISTEN_PATTERNS value
 * @property {number} STATE_REGISTRY_RECORD_PUBLISHED_SUBSCRIPTIONS=17 STATE_REGISTRY_RECORD_PUBLISHED_SUBSCRIPTIONS value
 * @property {number} STATE_REGISTRY_EVENT_PUBLISHED_SUBSCRIPTIONS=18 STATE_REGISTRY_EVENT_PUBLISHED_SUBSCRIPTIONS value
 * @property {number} STATE_REGISTRY_RECORD_LISTENING=19 STATE_REGISTRY_RECORD_LISTENING value
 * @property {number} STATE_REGISTRY_EVENT_LISTENING=20 STATE_REGISTRY_EVENT_LISTENING value
 * @property {number} STATE_REGISTRY_STATE_REGISTRY=21 STATE_REGISTRY_STATE_REGISTRY value
 */
$root.STATE_REGISTRY_TOPIC = (function() {
    var valuesById = {}, values = Object.create(valuesById);
    values[valuesById[0] = "STATE_REGISTRY_UNKNOWN"] = 0;
    values[valuesById[11] = "STATE_REGISTRY_EVENT_SUBSCRIPTIONS"] = 11;
    values[valuesById[12] = "STATE_REGISTRY_RECORD_SUBSCRIPTIONS"] = 12;
    values[valuesById[9] = "STATE_REGISTRY_SUBSCRIPTIONS"] = 9;
    values[valuesById[10] = "STATE_REGISTRY_ONLINE_USERS"] = 10;
    values[valuesById[24] = "STATE_REGISTRY_MONITORING_SUBSCRIPTIONS"] = 24;
    values[valuesById[13] = "STATE_REGISTRY_RPC_SUBSCRIPTIONS"] = 13;
    values[valuesById[14] = "STATE_REGISTRY_PRESENCE_SUBSCRIPTIONS"] = 14;
    values[valuesById[15] = "STATE_REGISTRY_RECORD_LISTEN_PATTERNS"] = 15;
    values[valuesById[16] = "STATE_REGISTRY_EVENT_LISTEN_PATTERNS"] = 16;
    values[valuesById[17] = "STATE_REGISTRY_RECORD_PUBLISHED_SUBSCRIPTIONS"] = 17;
    values[valuesById[18] = "STATE_REGISTRY_EVENT_PUBLISHED_SUBSCRIPTIONS"] = 18;
    values[valuesById[19] = "STATE_REGISTRY_RECORD_LISTENING"] = 19;
    values[valuesById[20] = "STATE_REGISTRY_EVENT_LISTENING"] = 20;
    values[valuesById[21] = "STATE_REGISTRY_STATE_REGISTRY"] = 21;
    return values;
})();

/**
 * STATE_ACTION enum.
 * @exports STATE_ACTION
 * @enum {number}
 * @property {number} STATE_UNKNOWN=0 STATE_UNKNOWN value
 * @property {number} STATE_ERROR=1 STATE_ERROR value
 * @property {number} STATE_ADD=2 STATE_ADD value
 * @property {number} STATE_REMOVE=3 STATE_REMOVE value
 * @property {number} STATE_REQUEST_FULL_STATE=4 STATE_REQUEST_FULL_STATE value
 * @property {number} STATE_FULL_STATE=5 STATE_FULL_STATE value
 * @property {number} STATE_CHECKSUM=6 STATE_CHECKSUM value
 */
$root.STATE_ACTION = (function() {
    var valuesById = {}, values = Object.create(valuesById);
    values[valuesById[0] = "STATE_UNKNOWN"] = 0;
    values[valuesById[1] = "STATE_ERROR"] = 1;
    values[valuesById[2] = "STATE_ADD"] = 2;
    values[valuesById[3] = "STATE_REMOVE"] = 3;
    values[valuesById[4] = "STATE_REQUEST_FULL_STATE"] = 4;
    values[valuesById[5] = "STATE_FULL_STATE"] = 5;
    values[valuesById[6] = "STATE_CHECKSUM"] = 6;
    return values;
})();

$root.StateMessage = (function() {

    /**
     * Properties of a StateMessage.
     * @exports IStateMessage
     * @interface IStateMessage
     * @property {STATE_ACTION|null} [action] StateMessage action
     * @property {string|null} [data] StateMessage data
     * @property {boolean|null} [isError] StateMessage isError
     * @property {number|null} [checksum] StateMessage checksum
     * @property {Array.<string>|null} [fullState] StateMessage fullState
     * @property {string|null} [serverName] StateMessage serverName
     * @property {STATE_REGISTRY_TOPIC|null} [registryTOPIC] StateMessage registryTOPIC
     */

    /**
     * Constructs a new StateMessage.
     * @exports StateMessage
     * @classdesc Represents a StateMessage.
     * @implements IStateMessage
     * @constructor
     * @param {IStateMessage=} [properties] Properties to set
     */
    function StateMessage(properties) {
        this.fullState = [];
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * StateMessage action.
     * @member {STATE_ACTION} action
     * @memberof StateMessage
     * @instance
     */
    StateMessage.prototype.action = 0;

    /**
     * StateMessage data.
     * @member {string} data
     * @memberof StateMessage
     * @instance
     */
    StateMessage.prototype.data = "";

    /**
     * StateMessage isError.
     * @member {boolean} isError
     * @memberof StateMessage
     * @instance
     */
    StateMessage.prototype.isError = false;

    /**
     * StateMessage checksum.
     * @member {number} checksum
     * @memberof StateMessage
     * @instance
     */
    StateMessage.prototype.checksum = 0;

    /**
     * StateMessage fullState.
     * @member {Array.<string>} fullState
     * @memberof StateMessage
     * @instance
     */
    StateMessage.prototype.fullState = $util.emptyArray;

    /**
     * StateMessage serverName.
     * @member {string} serverName
     * @memberof StateMessage
     * @instance
     */
    StateMessage.prototype.serverName = "";

    /**
     * StateMessage registryTOPIC.
     * @member {STATE_REGISTRY_TOPIC} registryTOPIC
     * @memberof StateMessage
     * @instance
     */
    StateMessage.prototype.registryTOPIC = 0;

    /**
     * Encodes the specified StateMessage message. Does not implicitly {@link StateMessage.verify|verify} messages.
     * @function encode
     * @memberof StateMessage
     * @static
     * @param {IStateMessage} message StateMessage message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    StateMessage.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.action != null && Object.hasOwnProperty.call(message, "action"))
            writer.uint32(/* id 1, wireType 0 =*/8).int32(message.action);
        if (message.data != null && Object.hasOwnProperty.call(message, "data"))
            writer.uint32(/* id 2, wireType 2 =*/18).string(message.data);
        if (message.isError != null && Object.hasOwnProperty.call(message, "isError"))
            writer.uint32(/* id 3, wireType 0 =*/24).bool(message.isError);
        if (message.checksum != null && Object.hasOwnProperty.call(message, "checksum"))
            writer.uint32(/* id 19, wireType 0 =*/152).int32(message.checksum);
        if (message.fullState != null && message.fullState.length)
            for (var i = 0; i < message.fullState.length; ++i)
                writer.uint32(/* id 20, wireType 2 =*/162).string(message.fullState[i]);
        if (message.serverName != null && Object.hasOwnProperty.call(message, "serverName"))
            writer.uint32(/* id 21, wireType 2 =*/170).string(message.serverName);
        if (message.registryTOPIC != null && Object.hasOwnProperty.call(message, "registryTOPIC"))
            writer.uint32(/* id 22, wireType 0 =*/176).int32(message.registryTOPIC);
        return writer;
    };

    /**
     * Encodes the specified StateMessage message, length delimited. Does not implicitly {@link StateMessage.verify|verify} messages.
     * @function encodeDelimited
     * @memberof StateMessage
     * @static
     * @param {IStateMessage} message StateMessage message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    StateMessage.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a StateMessage message from the specified reader or buffer.
     * @function decode
     * @memberof StateMessage
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {StateMessage} StateMessage
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    StateMessage.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.StateMessage();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.action = reader.int32();
                break;
            case 2:
                message.data = reader.string();
                break;
            case 3:
                message.isError = reader.bool();
                break;
            case 19:
                message.checksum = reader.int32();
                break;
            case 20:
                if (!(message.fullState && message.fullState.length))
                    message.fullState = [];
                message.fullState.push(reader.string());
                break;
            case 21:
                message.serverName = reader.string();
                break;
            case 22:
                message.registryTOPIC = reader.int32();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a StateMessage message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof StateMessage
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {StateMessage} StateMessage
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    StateMessage.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    return StateMessage;
})();

module.exports = $root;
