/* eslint-disable @typescript-eslint/no-explicit-any */
import crypto from '@trust/webcrypto';
import { EventEmitter } from 'events';
import * as util from 'util';

import { Role } from './Role';
import { SignalingClient, SignalingClientConfig } from './SignalingClient';
import { mockDateClass, restoreDateClass } from './internal/testUtils';

const RealWebSocket = window.WebSocket;

const ENDPOINT = 'wss://endpoint.kinesisvideo.amazonaws.com';
const CHANNEL_ARN = 'arn:aws:kinesisvideo:us-west-2:123456789012:channel/testChannel/1234567890';
const CLIENT_ID = 'TestClientId';
const SDP_OFFER_OBJECT = {
    sdp: 'offer= true\nvideo= true',
    type: 'offer',
};
const SDP_OFFER: RTCSessionDescription = {
    ...SDP_OFFER_OBJECT,
    toJSON: () => SDP_OFFER_OBJECT,
} as any;
const SDP_OFFER_VIEWER_STRING = '{"action":"SDP_OFFER","messagePayload":"eyJzZHAiOiJvZmZlcj0gdHJ1ZVxudmlkZW89IHRydWUiLCJ0eXBlIjoib2ZmZXIifQ=="}';
const SDP_OFFER_MASTER_STRING =
    '{"action":"SDP_OFFER","messagePayload":"eyJzZHAiOiJvZmZlcj0gdHJ1ZVxudmlkZW89IHRydWUiLCJ0eXBlIjoib2ZmZXIifQ==","recipientClientId":"TestClientId"}';
const SDP_OFFER_VIEWER_MESSAGE =
    '{"messageType":"SDP_OFFER","messagePayload":"eyJzZHAiOiJvZmZlcj0gdHJ1ZVxudmlkZW89IHRydWUiLCJ0eXBlIjoib2ZmZXIifQ==","senderClientId":"TestClientId"}';
const SDP_OFFER_MASTER_MESSAGE = '{"messageType":"SDP_OFFER","messagePayload":"eyJzZHAiOiJvZmZlcj0gdHJ1ZVxudmlkZW89IHRydWUiLCJ0eXBlIjoib2ZmZXIifQ=="}';

const SDP_ANSWER_OBJECT = {
    sdp: 'offer= true\nvideo= true',
    type: 'answer',
};
const SDP_ANSWER: RTCSessionDescription = {
    ...SDP_ANSWER_OBJECT,
    toJSON: () => SDP_ANSWER_OBJECT,
} as any;
const SDP_ANSWER_VIEWER_STRING = '{"action":"SDP_ANSWER","messagePayload":"eyJzZHAiOiJvZmZlcj0gdHJ1ZVxudmlkZW89IHRydWUiLCJ0eXBlIjoiYW5zd2VyIn0="}';
const SDP_ANSWER_MASTER_STRING =
    '{"action":"SDP_ANSWER","messagePayload":"eyJzZHAiOiJvZmZlcj0gdHJ1ZVxudmlkZW89IHRydWUiLCJ0eXBlIjoiYW5zd2VyIn0=","recipientClientId":"TestClientId"}';
const SDP_ANSWER_VIEWER_MESSAGE =
    '{"messageType":"SDP_ANSWER","messagePayload":"eyJzZHAiOiJvZmZlcj0gdHJ1ZVxudmlkZW89IHRydWUiLCJ0eXBlIjoiYW5zd2VyIn0=","senderClientId":"TestClientId"}';
const SDP_ANSWER_MASTER_MESSAGE = '{"messageType":"SDP_ANSWER","messagePayload":"eyJzZHAiOiJvZmZlcj0gdHJ1ZVxudmlkZW89IHRydWUiLCJ0eXBlIjoiYW5zd2VyIn0="}';

const ICE_CANDIDATE_OBJECT = {
    candidate: 'upd 10.111.34.88',
    sdpMid: '1',
    sdpMLineIndex: 1,
};
const ICE_CANDIDATE: RTCIceCandidate = {
    ...ICE_CANDIDATE_OBJECT,
    toJSON: () => ICE_CANDIDATE_OBJECT,
} as any;
const ICE_CANDIDATE_VIEWER_STRING =
    '{"action":"ICE_CANDIDATE","messagePayload":"eyJjYW5kaWRhdGUiOiJ1cGQgMTAuMTExLjM0Ljg4Iiwic2RwTWlkIjoiMSIsInNkcE1MaW5lSW5kZXgiOjF9"}';
const ICE_CANDIDATE_MASTER_STRING =
    '{"action":"ICE_CANDIDATE","messagePayload":"eyJjYW5kaWRhdGUiOiJ1cGQgMTAuMTExLjM0Ljg4Iiwic2RwTWlkIjoiMSIsInNkcE1MaW5lSW5kZXgiOjF9","recipientClientId":"TestClientId"}';
const ICE_CANDIDATE_VIEWER_MESSAGE =
    '{"messageType":"ICE_CANDIDATE","messagePayload":"eyJjYW5kaWRhdGUiOiJ1cGQgMTAuMTExLjM0Ljg4Iiwic2RwTWlkIjoiMSIsInNkcE1MaW5lSW5kZXgiOjF9","senderClientId":"TestClientId"}';
const ICE_CANDIDATE_MASTER_MESSAGE =
    '{"messageType":"ICE_CANDIDATE","messagePayload":"eyJjYW5kaWRhdGUiOiJ1cGQgMTAuMTExLjM0Ljg4Iiwic2RwTWlkIjoiMSIsInNkcE1MaW5lSW5kZXgiOjF9"}';

class MockWebSocket extends EventEmitter {
    static instance: MockWebSocket;

    public readyState: number;
    public send = jest.fn();
    public close = jest.fn().mockImplementation(() => {
        if (this.readyState === RealWebSocket.CONNECTING || this.readyState === RealWebSocket.OPEN) {
            this.readyState = RealWebSocket.CLOSING;
            setTimeout(() => {
                if (this.readyState === RealWebSocket.CLOSING) {
                    this.readyState = RealWebSocket.CLOSED;
                    this.emit('close');
                }
            }, 5);
        }
    });

    public constructor() {
        super();
        this.readyState = RealWebSocket.CONNECTING;
        setTimeout(() => {
            if (this.readyState === RealWebSocket.CONNECTING) {
                this.readyState = RealWebSocket.OPEN;
                this.emit('open');
            }
        }, 10);
        MockWebSocket.instance = this;
    }

    public addEventListener(...args: any[]): void {
        super.addListener.apply(this, args);
    }

    public removeEventListener(...args: any[]): void {
        super.removeListener.apply(this, args);
    }
}
window.WebSocket = MockWebSocket as any;

describe('SignalingClient', () => {
    let config: Partial<SignalingClientConfig>;
    let signer: jest.Mock;

    const mockDate = new Date('2020-05-01T00:00:00.000Z');
    const mockClockSkewedDate = new Date('2020-05-01T00:16:40.000Z');

    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    global.crypto = crypto;
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    global.TextEncoder = util.TextEncoder;

    beforeEach(() => {
        mockDateClass(mockDate);
        signer = jest.fn().mockImplementation(endpoint => new Promise(resolve => resolve(endpoint)));
        config = {
            role: Role.VIEWER,
            clientId: CLIENT_ID,
            channelARN: CHANNEL_ARN,
            region: 'us-west-2',
            channelEndpoint: ENDPOINT,
            requestSigner: {
                getSignedURL: signer,
            },
        };
    });

    afterEach(() => {
        restoreDateClass();
    });

    describe('constructor', () => {
        beforeEach(() => {
            delete config.requestSigner;
            config.credentials = {
                accessKeyId: 'ACCESS_KEY_ID',
                secretAccessKey: 'SECRET_ACCESS_KEY',
                sessionToken: 'SESSION_TOKEN',
            };
        });

        it('should not throw if valid viewer config provided', () => {
            new SignalingClient(config as SignalingClientConfig);
        });

        it('should not throw if valid master config provided', () => {
            config.role = Role.MASTER;
            delete config.clientId;
            new SignalingClient(config as SignalingClientConfig);
        });

        it('should throw if no config provided', () => {
            expect(() => new SignalingClient(null)).toThrow('SignalingClientConfig cannot be null');
        });

        it('should throw if viewer and no client id is provided', () => {
            config.clientId = null;
            expect(() => new SignalingClient(config as SignalingClientConfig)).toThrow('clientId cannot be null');
        });

        it('should throw if master and a client id is provided', () => {
            config.role = Role.MASTER;
            expect(() => new SignalingClient(config as SignalingClientConfig)).toThrow('clientId should be null');
        });

        it('should throw if ARN is not provided', () => {
            config.channelARN = null;
            expect(() => new SignalingClient(config as SignalingClientConfig)).toThrow('channelARN cannot be null');
        });

        it('should throw if region is not provided', () => {
            config.region = null;
            expect(() => new SignalingClient(config as SignalingClientConfig)).toThrow('region cannot be null');
        });

        it('should throw if channelEndpoint is not provided', () => {
            config.channelEndpoint = null;
            expect(() => new SignalingClient(config as SignalingClientConfig)).toThrow('channelEndpoint cannot be null');
        });
    });

    describe('open', () => {
        it('should open a connection to the signaling server as the viewer', done => {
            const client = new SignalingClient(config as SignalingClientConfig);
            client.on('open', () => {
                expect(signer).toBeCalledWith(
                    ENDPOINT,
                    {
                        'X-Amz-ChannelARN': CHANNEL_ARN,
                        'X-Amz-ClientId': CLIENT_ID,
                    },
                    mockDate,
                );
                done();
            });
            client.open();
        });

        it('should open a connection to the signaling server as the master', done => {
            config.role = Role.MASTER;
            delete config.clientId;
            const client = new SignalingClient(config as SignalingClientConfig);
            client.on('open', () => {
                expect(signer).toBeCalledWith(
                    ENDPOINT,
                    {
                        'X-Amz-ChannelARN': CHANNEL_ARN,
                    },
                    mockDate,
                );
                done();
            });
            client.open();
        });

        it('should open a connection to the signaling server with clock skew adjusted date', done => {
            config.systemClockOffset = 1000000;
            const client = new SignalingClient(config as SignalingClientConfig);
            client.on('open', () => {
                expect(signer).toBeCalledWith(
                    ENDPOINT,
                    {
                        'X-Amz-ChannelARN': CHANNEL_ARN,
                        'X-Amz-ClientId': CLIENT_ID,
                    },
                    mockClockSkewedDate,
                );
                done();
            });
            client.open();
        });

        it('should not open a connection to the signaling server if it is closed while opening', async () => {
            config.requestSigner.getSignedURL = jest.fn().mockImplementation(endpoint => new Promise(resolve => setTimeout(() => resolve(endpoint), 5)));
            const client = new SignalingClient(config as SignalingClientConfig);
            client.on('open', () => {
                expect('Should not have fired an event').toBeFalsy();
            });
            client.open();
            client.close();
            return new Promise(resolve => setTimeout(resolve, 100));
        });

        it('should throw an error when making multiple open requests', () => {
            const client = new SignalingClient(config as SignalingClientConfig);
            expect(() => {
                client.open();
                client.open();
            }).toThrow('Client is already open, opening, or closing');
        });

        it('should emit an error event if the connection cannot be started', done => {
            signer.mockImplementation(endpoint => new Promise((_, reject) => reject(new Error(endpoint))));
            const client = new SignalingClient(config as SignalingClientConfig);
            client.on('error', () => {
                done();
            });
            client.open();
        });
    });

    describe('close', () => {
        it('should close an open connection', done => {
            const client = new SignalingClient(config as SignalingClientConfig);

            // Open a channel, close it, then wait for the close event.
            client.on('open', () => {
                client.close();
            });
            client.on('close', () => {
                expect(MockWebSocket.instance.close).toHaveBeenCalled();
                done();
            });
            client.open();
        });

        it('should do nothing if the connection is closing', done => {
            const client = new SignalingClient(config as SignalingClientConfig);

            // Open a channel, close it, try to close it again, then wait for the close event.
            client.on('open', () => {
                client.close();
                expect(() => client.close()).not.toThrow();
            });
            client.on('close', () => {
                done();
            });
            client.open();
        });

        it('should do nothing if the connection is not open', async () => {
            const client = new SignalingClient(config as SignalingClientConfig);

            // Close the client and then wait 100ms. If the close event fires, fail.
            client.on('close', () => {
                expect('Should not have fired an event').toBeFalsy();
            });
            client.close();
            return new Promise(resolve => setTimeout(resolve, 100));
        });
    });

    describe('sendSdpOffer', () => {
        it('should send the message as the viewer', done => {
            const client = new SignalingClient(config as SignalingClientConfig);
            client.open();
            client.on('open', () => {
                client.sendSdpOffer(SDP_OFFER);
                expect(MockWebSocket.instance.send).toHaveBeenCalledWith(SDP_OFFER_VIEWER_STRING);
                done();
            });
        });

        it('should send the message as the master', done => {
            config.role = Role.MASTER;
            delete config.clientId;
            const client = new SignalingClient(config as SignalingClientConfig);
            client.open();
            client.on('open', () => {
                client.sendSdpOffer(SDP_OFFER, CLIENT_ID);
                expect(MockWebSocket.instance.send).toHaveBeenCalledWith(SDP_OFFER_MASTER_STRING);
                done();
            });
        });

        it('should throw an error if the connection is not open', () => {
            const client = new SignalingClient(config as SignalingClientConfig);
            expect(() => client.sendSdpOffer(SDP_OFFER)).toThrow('Could not send message because the connection to the signaling service is not open.');
        });

        it('should throw an error if there is a recipient id as viewer', done => {
            const client = new SignalingClient(config as SignalingClientConfig);
            client.open();
            client.on('open', () => {
                expect(() => client.sendSdpOffer(SDP_OFFER, CLIENT_ID)).toThrow(
                    'Unexpected recipient client id. As the VIEWER, messages must not be sent with a recipient client id.',
                );
                done();
            });
        });

        it('should throw an error if there is no recipient id as master', done => {
            config.role = Role.MASTER;
            delete config.clientId;
            const client = new SignalingClient(config as SignalingClientConfig);
            client.open();
            client.on('open', () => {
                expect(() => client.sendSdpOffer(SDP_OFFER)).toThrow(
                    'Missing recipient client id. As the MASTER, all messages must be sent with a recipient client id.',
                );
                done();
            });
        });
    });

    describe('sendSdpAnswer', () => {
        it('should send the message as the viewer', done => {
            const client = new SignalingClient(config as SignalingClientConfig);
            client.open();
            client.on('open', () => {
                client.sendSdpAnswer(SDP_ANSWER);
                expect(MockWebSocket.instance.send).toHaveBeenCalledWith(SDP_ANSWER_VIEWER_STRING);
                done();
            });
        });

        it('should send the message as the master', done => {
            config.role = Role.MASTER;
            delete config.clientId;
            const client = new SignalingClient(config as SignalingClientConfig);
            client.open();
            client.on('open', () => {
                client.sendSdpAnswer(SDP_ANSWER, CLIENT_ID);
                expect(MockWebSocket.instance.send).toHaveBeenCalledWith(SDP_ANSWER_MASTER_STRING);
                done();
            });
        });

        it('should throw an error if the connection is not open', () => {
            const client = new SignalingClient(config as SignalingClientConfig);
            expect(() => client.sendSdpAnswer(SDP_ANSWER)).toThrow('Could not send message because the connection to the signaling service is not open.');
        });

        it('should throw an error if there is a recipient id as viewer', done => {
            const client = new SignalingClient(config as SignalingClientConfig);
            client.open();
            client.on('open', () => {
                expect(() => client.sendSdpAnswer(SDP_ANSWER, CLIENT_ID)).toThrow(
                    'Unexpected recipient client id. As the VIEWER, messages must not be sent with a recipient client id.',
                );
                done();
            });
        });

        it('should throw an error if there is no recipient id as master', done => {
            config.role = Role.MASTER;
            delete config.clientId;
            const client = new SignalingClient(config as SignalingClientConfig);
            client.open();
            client.on('open', () => {
                expect(() => client.sendSdpAnswer(SDP_ANSWER)).toThrow(
                    'Missing recipient client id. As the MASTER, all messages must be sent with a recipient client id.',
                );
                done();
            });
        });
    });

    describe('sendIceCandidate', () => {
        it('should send the message as the viewer', done => {
            const client = new SignalingClient(config as SignalingClientConfig);
            client.open();
            client.on('open', () => {
                client.sendIceCandidate(ICE_CANDIDATE);
                expect(MockWebSocket.instance.send).toHaveBeenCalledWith(ICE_CANDIDATE_VIEWER_STRING);
                done();
            });
        });

        it('should send the message as the master', done => {
            config.role = Role.MASTER;
            delete config.clientId;
            const client = new SignalingClient(config as SignalingClientConfig);
            client.open();
            client.on('open', () => {
                client.sendIceCandidate(ICE_CANDIDATE, CLIENT_ID);
                expect(MockWebSocket.instance.send).toHaveBeenCalledWith(ICE_CANDIDATE_MASTER_STRING);
                done();
            });
        });

        it('should throw an error if the connection is not open', () => {
            const client = new SignalingClient(config as SignalingClientConfig);
            expect(() => client.sendIceCandidate(ICE_CANDIDATE)).toThrow('Could not send message because the connection to the signaling service is not open.');
        });

        it('should throw an error if there is a recipient id as viewer', done => {
            const client = new SignalingClient(config as SignalingClientConfig);
            client.open();
            client.on('open', () => {
                expect(() => client.sendIceCandidate(ICE_CANDIDATE, CLIENT_ID)).toThrow(
                    'Unexpected recipient client id. As the VIEWER, messages must not be sent with a recipient client id.',
                );
                done();
            });
        });

        it('should throw an error if there is no recipient id as master', done => {
            config.role = Role.MASTER;
            delete config.clientId;
            const client = new SignalingClient(config as SignalingClientConfig);
            client.open();
            client.on('open', () => {
                expect(() => client.sendIceCandidate(ICE_CANDIDATE)).toThrow(
                    'Missing recipient client id. As the MASTER, all messages must be sent with a recipient client id.',
                );
                done();
            });
        });
    });

    describe('events', () => {
        it('should ignore non-parsable messages from the signaling service', done => {
            const client = new SignalingClient(config as SignalingClientConfig);

            // Open a connection, receive a faulty message, and then continue to receive and process a non-faulty message.
            client.on('sdpOffer', () => {
                done();
            });
            client.on('open', () => {
                MockWebSocket.instance.emit('message', { data: 'not valid JSON' });
                MockWebSocket.instance.emit('message', { data: SDP_OFFER_MASTER_MESSAGE });
            });
            client.open();
        });

        describe('sdpOffer', () => {
            it('should parse sdpOffer messages from the master', done => {
                const client = new SignalingClient(config as SignalingClientConfig);
                client.on('sdpOffer', (sdpOffer, senderClientId) => {
                    expect(sdpOffer).toEqual(SDP_OFFER_OBJECT);
                    expect(senderClientId).toBeFalsy();
                    done();
                });
                client.on('open', () => {
                    MockWebSocket.instance.emit('message', { data: SDP_OFFER_MASTER_MESSAGE });
                });
                client.open();
            });

            it('should parse sdpOffer messages from the viewer', done => {
                config.role = Role.MASTER;
                delete config.clientId;
                const client = new SignalingClient(config as SignalingClientConfig);
                client.on('sdpOffer', (sdpOffer, senderClientId) => {
                    expect(sdpOffer).toEqual(SDP_OFFER_OBJECT);
                    expect(senderClientId).toEqual(CLIENT_ID);
                    done();
                });
                client.on('open', () => {
                    MockWebSocket.instance.emit('message', { data: SDP_OFFER_VIEWER_MESSAGE });
                });
                client.open();
            });

            it('should parse sdpOffer messages from the master and release pending ICE candidates', done => {
                const client = new SignalingClient(config as SignalingClientConfig);
                client.on('sdpOffer', (sdpOffer, senderClientId) => {
                    expect(sdpOffer).toEqual(SDP_OFFER_OBJECT);
                    expect(senderClientId).toBeFalsy();
                    client.on('iceCandidate', (iceCandidate, senderClientId) => {
                        expect(iceCandidate).toEqual(ICE_CANDIDATE_OBJECT);
                        expect(senderClientId).toBeFalsy();
                        done();
                    });
                });
                client.on('open', () => {
                    MockWebSocket.instance.emit('message', { data: ICE_CANDIDATE_MASTER_MESSAGE });
                    MockWebSocket.instance.emit('message', { data: ICE_CANDIDATE_MASTER_MESSAGE });
                    MockWebSocket.instance.emit('message', { data: SDP_OFFER_MASTER_MESSAGE });
                });
                client.open();
            });
        });

        describe('sdpAnswer', () => {
            it('should parse sdpAnswer messages from the master', done => {
                const client = new SignalingClient(config as SignalingClientConfig);
                client.on('sdpAnswer', (sdpAnswer, senderClientId) => {
                    expect(sdpAnswer).toEqual(SDP_ANSWER_OBJECT);
                    expect(senderClientId).toBeFalsy();
                    done();
                });
                client.on('open', () => {
                    MockWebSocket.instance.emit('message', { data: SDP_ANSWER_MASTER_MESSAGE });
                });
                client.open();
            });

            it('should parse sdpAnswer messages from the viewer', done => {
                config.role = Role.MASTER;
                delete config.clientId;
                const client = new SignalingClient(config as SignalingClientConfig);
                client.on('sdpAnswer', (sdpAnswer, senderClientId) => {
                    expect(sdpAnswer).toEqual(SDP_ANSWER_OBJECT);
                    expect(senderClientId).toEqual(CLIENT_ID);
                    done();
                });
                client.on('open', () => {
                    MockWebSocket.instance.emit('message', { data: SDP_ANSWER_VIEWER_MESSAGE });
                });
                client.open();
            });

            it('should parse sdpAnswer messages from the master and release pending ICE candidates', done => {
                const client = new SignalingClient(config as SignalingClientConfig);
                client.on('sdpAnswer', (sdpAnswer, senderClientId) => {
                    expect(sdpAnswer).toEqual(SDP_ANSWER_OBJECT);
                    expect(senderClientId).toBeFalsy();
                    client.on('iceCandidate', (iceCandidate, senderClientId) => {
                        expect(iceCandidate).toEqual(ICE_CANDIDATE_OBJECT);
                        expect(senderClientId).toBeFalsy();
                        done();
                    });
                });
                client.on('open', () => {
                    MockWebSocket.instance.emit('message', { data: ICE_CANDIDATE_MASTER_MESSAGE });
                    MockWebSocket.instance.emit('message', { data: ICE_CANDIDATE_MASTER_MESSAGE });
                    MockWebSocket.instance.emit('message', { data: SDP_ANSWER_MASTER_MESSAGE });
                });
                client.open();
            });
        });

        describe('iceCandidate', () => {
            it('should parse iceCandidate messages from the master', done => {
                const client = new SignalingClient(config as SignalingClientConfig);
                client.on('iceCandidate', (iceCandidate, senderClientId) => {
                    expect(iceCandidate).toEqual(ICE_CANDIDATE_OBJECT);
                    expect(senderClientId).toBeFalsy();
                    done();
                });
                client.on('open', () => {
                    MockWebSocket.instance.emit('message', { data: SDP_ANSWER_MASTER_MESSAGE });
                    MockWebSocket.instance.emit('message', { data: ICE_CANDIDATE_MASTER_MESSAGE });
                });
                client.open();
            });

            it('should parse iceCandidate messages from the viewer', done => {
                config.role = Role.MASTER;
                delete config.clientId;
                const client = new SignalingClient(config as SignalingClientConfig);
                client.on('iceCandidate', (iceCandidate, senderClientId) => {
                    expect(iceCandidate).toEqual(ICE_CANDIDATE_OBJECT);
                    expect(senderClientId).toEqual(CLIENT_ID);
                    done();
                });
                client.on('open', () => {
                    MockWebSocket.instance.emit('message', { data: SDP_ANSWER_VIEWER_MESSAGE });
                    MockWebSocket.instance.emit('message', { data: ICE_CANDIDATE_VIEWER_MESSAGE });
                });
                client.open();
            });
        });
    });
});
