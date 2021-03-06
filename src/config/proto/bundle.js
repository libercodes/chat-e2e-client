/* eslint-disable */
/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
"use strict";

var $protobuf = require("protobufjs/minimal");

// Common aliases
var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

$root.DisconnectEvent = (function() {

    /**
     * Properties of a DisconnectEvent.
     * @exports IDisconnectEvent
     * @interface IDisconnectEvent
     * @property {string|null} [user] DisconnectEvent user
     * @property {string|null} [date] DisconnectEvent date
     */

    /**
     * Constructs a new DisconnectEvent.
     * @exports DisconnectEvent
     * @classdesc Represents a DisconnectEvent.
     * @implements IDisconnectEvent
     * @constructor
     * @param {IDisconnectEvent=} [properties] Properties to set
     */
    function DisconnectEvent(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * DisconnectEvent user.
     * @member {string} user
     * @memberof DisconnectEvent
     * @instance
     */
    DisconnectEvent.prototype.user = "";

    /**
     * DisconnectEvent date.
     * @member {string} date
     * @memberof DisconnectEvent
     * @instance
     */
    DisconnectEvent.prototype.date = "";

    /**
     * Creates a new DisconnectEvent instance using the specified properties.
     * @function create
     * @memberof DisconnectEvent
     * @static
     * @param {IDisconnectEvent=} [properties] Properties to set
     * @returns {DisconnectEvent} DisconnectEvent instance
     */
    DisconnectEvent.create = function create(properties) {
        return new DisconnectEvent(properties);
    };

    /**
     * Encodes the specified DisconnectEvent message. Does not implicitly {@link DisconnectEvent.verify|verify} messages.
     * @function encode
     * @memberof DisconnectEvent
     * @static
     * @param {IDisconnectEvent} message DisconnectEvent message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    DisconnectEvent.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.user != null && Object.hasOwnProperty.call(message, "user"))
            writer.uint32(/* id 1, wireType 2 =*/10).string(message.user);
        if (message.date != null && Object.hasOwnProperty.call(message, "date"))
            writer.uint32(/* id 2, wireType 2 =*/18).string(message.date);
        return writer;
    };

    /**
     * Encodes the specified DisconnectEvent message, length delimited. Does not implicitly {@link DisconnectEvent.verify|verify} messages.
     * @function encodeDelimited
     * @memberof DisconnectEvent
     * @static
     * @param {IDisconnectEvent} message DisconnectEvent message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    DisconnectEvent.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a DisconnectEvent message from the specified reader or buffer.
     * @function decode
     * @memberof DisconnectEvent
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {DisconnectEvent} DisconnectEvent
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    DisconnectEvent.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.DisconnectEvent();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.user = reader.string();
                break;
            case 2:
                message.date = reader.string();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a DisconnectEvent message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof DisconnectEvent
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {DisconnectEvent} DisconnectEvent
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    DisconnectEvent.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a DisconnectEvent message.
     * @function verify
     * @memberof DisconnectEvent
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    DisconnectEvent.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.user != null && message.hasOwnProperty("user"))
            if (!$util.isString(message.user))
                return "user: string expected";
        if (message.date != null && message.hasOwnProperty("date"))
            if (!$util.isString(message.date))
                return "date: string expected";
        return null;
    };

    /**
     * Creates a DisconnectEvent message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof DisconnectEvent
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {DisconnectEvent} DisconnectEvent
     */
    DisconnectEvent.fromObject = function fromObject(object) {
        if (object instanceof $root.DisconnectEvent)
            return object;
        var message = new $root.DisconnectEvent();
        if (object.user != null)
            message.user = String(object.user);
        if (object.date != null)
            message.date = String(object.date);
        return message;
    };

    /**
     * Creates a plain object from a DisconnectEvent message. Also converts values to other types if specified.
     * @function toObject
     * @memberof DisconnectEvent
     * @static
     * @param {DisconnectEvent} message DisconnectEvent
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    DisconnectEvent.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults) {
            object.user = "";
            object.date = "";
        }
        if (message.user != null && message.hasOwnProperty("user"))
            object.user = message.user;
        if (message.date != null && message.hasOwnProperty("date"))
            object.date = message.date;
        return object;
    };

    /**
     * Converts this DisconnectEvent to JSON.
     * @function toJSON
     * @memberof DisconnectEvent
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    DisconnectEvent.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return DisconnectEvent;
})();

$root.Message = (function() {

    /**
     * Properties of a Message.
     * @exports IMessage
     * @interface IMessage
     * @property {string|null} [user] Message user
     * @property {string|null} [text] Message text
     * @property {string|null} [date] Message date
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
     * Message user.
     * @member {string} user
     * @memberof Message
     * @instance
     */
    Message.prototype.user = "";

    /**
     * Message text.
     * @member {string} text
     * @memberof Message
     * @instance
     */
    Message.prototype.text = "";

    /**
     * Message date.
     * @member {string} date
     * @memberof Message
     * @instance
     */
    Message.prototype.date = "";

    /**
     * Creates a new Message instance using the specified properties.
     * @function create
     * @memberof Message
     * @static
     * @param {IMessage=} [properties] Properties to set
     * @returns {Message} Message instance
     */
    Message.create = function create(properties) {
        return new Message(properties);
    };

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
        if (message.user != null && Object.hasOwnProperty.call(message, "user"))
            writer.uint32(/* id 1, wireType 2 =*/10).string(message.user);
        if (message.text != null && Object.hasOwnProperty.call(message, "text"))
            writer.uint32(/* id 2, wireType 2 =*/18).string(message.text);
        if (message.date != null && Object.hasOwnProperty.call(message, "date"))
            writer.uint32(/* id 3, wireType 2 =*/26).string(message.date);
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
            case 1:
                message.user = reader.string();
                break;
            case 2:
                message.text = reader.string();
                break;
            case 3:
                message.date = reader.string();
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

    /**
     * Verifies a Message message.
     * @function verify
     * @memberof Message
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    Message.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.user != null && message.hasOwnProperty("user"))
            if (!$util.isString(message.user))
                return "user: string expected";
        if (message.text != null && message.hasOwnProperty("text"))
            if (!$util.isString(message.text))
                return "text: string expected";
        if (message.date != null && message.hasOwnProperty("date"))
            if (!$util.isString(message.date))
                return "date: string expected";
        return null;
    };

    /**
     * Creates a Message message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof Message
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {Message} Message
     */
    Message.fromObject = function fromObject(object) {
        if (object instanceof $root.Message)
            return object;
        var message = new $root.Message();
        if (object.user != null)
            message.user = String(object.user);
        if (object.text != null)
            message.text = String(object.text);
        if (object.date != null)
            message.date = String(object.date);
        return message;
    };

    /**
     * Creates a plain object from a Message message. Also converts values to other types if specified.
     * @function toObject
     * @memberof Message
     * @static
     * @param {Message} message Message
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    Message.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults) {
            object.user = "";
            object.text = "";
            object.date = "";
        }
        if (message.user != null && message.hasOwnProperty("user"))
            object.user = message.user;
        if (message.text != null && message.hasOwnProperty("text"))
            object.text = message.text;
        if (message.date != null && message.hasOwnProperty("date"))
            object.date = message.date;
        return object;
    };

    /**
     * Converts this Message to JSON.
     * @function toJSON
     * @memberof Message
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    Message.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return Message;
})();

module.exports = $root;
