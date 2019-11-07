/// <reference types="node" />
import { EventEmitter } from 'events';
import { Role } from 'kvs-webrtc/Role';
interface WebSocketClientConfig {
    credentials: AWS.Credentials;
    channelARN: string;
    channelEndpoint: string;
    region: string;
    role: Role;
    clientId?: string;
}
/**
 * Client for sending and receiving messages from a KVS Signaling Channel. The client can operate as either the 'MASTER' or a 'VIEWER'.
 *
 * Typically, the 'MASTER' listens for ICE candidates and SDP offers and responds with and SDP answer and its own ICE candidates.
 *
 * Typically, the 'VIEWER' sends an SDP offer and its ICE candidates and then listens for ICE candidates and SDP answers from the 'MASTER'.
 */
export declare class SignalingClient extends EventEmitter {
    private static DEFAULT_CLIENT_ID;
    private websocket;
    private readonly requestSigner;
    private readonly config;
    private readonly pendingIceCandidatesByClientId;
    private readonly hasReceivedRemoteSDPByClientId;
    /**
     * Creates a new SignalingClient. The connection with the signaling service must be opened with the 'open' method.
     * @param {WebSocketClientConfig} config - Configuration options and parameters.
     * is not provided, it will be loaded from the global scope.
     */
    constructor(config: WebSocketClientConfig);
    /**
     * Opens the connection with the signaling service. Listen to the 'open' event to be notified when the connection has been opened.
     *
     * An error is thrown if the connection is already open or being opened.
     */
    open(): Promise<void>;
    /**
     * Closes the connection to the KVS Signaling Service. If already closed or closing, no action is taken. Listen to the 'close' event to be notified when the
     * connection has been closed.
     */
    close(): void;
    /**
     * Sends the given SDP offer to the signaling service.
     *
     * Typically, only the 'VIEWER' role should send an SDP offer.
     * @param {RTCSessionDescription} sdpOffer - SDP offer to send.
     * @param {string} [recipientClientId] - ID of the client to send the message to. Required for 'MASTER' role. Should not be present for 'VIEWER' role.
     */
    sendSdpOffer(sdpOffer: RTCSessionDescription, recipientClientId?: string): void;
    /**
     * Sends the given SDP answer to the signaling service.
     *
     * Typically, only the 'MASTER' role should send an SDP answer.
     * @param {RTCSessionDescription} sdpAnswer - SDP answer to send.
     * @param {string} [recipientClientId] - ID of the client to send the message to. Required for 'MASTER' role. Should not be present for 'VIEWER' role.
     */
    sendSdpAnswer(sdpAnswer: RTCSessionDescription, recipientClientId?: string): void;
    /**
     * Sends the given ICE candidate to the signaling service.
     *
     * Typically, both the 'VIEWER' role and 'MASTER' role should send ICE candidates.
     * @param {RTCIceCandidate} iceCandidate - ICE candidate to send.
     * @param {string} [recipientClientId] - ID of the client to send the message to. Required for 'MASTER' role. Should not be present for 'VIEWER' role.
     */
    sendIceCandidate(iceCandidate: RTCIceCandidate, recipientClientId?: string): void;
    /**
     * Validates the WebSocket connection is open and that the recipient client id is present if sending as the 'MASTER'. Encodes the given message payload
     * and sends the message to the signaling service.
     */
    private sendMessage;
    /**
     * Removes all event listeners from the WebSocket and removes the reference to the WebSocket object.
     */
    private cleanupWebSocket;
    /**
     * WebSocket 'open' event handler. Forwards the event on to listeners.
     */
    private onOpen;
    /**
     * WebSocket 'message' event handler. Attempts to parse the message and handle it according to the message type.
     */
    private onMessage;
    /**
     * Takes the given base64 encoded string and decodes it into a JSON object.
     */
    private static parseJSONObjectFromBase64String;
    /**
     * Takes the given JSON object and encodes it into a base64 string.
     */
    private static serializeJSONObjectAsBase64String;
    /**
     * If an SDP offer or answer has already been received from the given client, then the given ICE candidate is emitted. Otherwise, it is queued up for when
     * an SDP offer or answer is received.
     */
    private emitOrQueueIceCandidate;
    /**
     * Emits any pending ICE candidates for the given client and records that an SDP offer or answer has been received from the client.
     */
    private emitPendingIceCandidates;
    /**
     * Throws an error if the recipient client id is null and the current role is 'MASTER' as all messages sent as 'MASTER' should have a recipient client id.
     */
    private validateRecipientClientId;
    /**
     * 'error' event handler. Forwards the error onto listeners.
     */
    private onError;
    /**
     * 'close' event handler. Forwards the error onto listeners and cleans up the connection.
     */
    private onClose;
}
export {};
