import crypto from '@trust/webcrypto';
import * as util from 'util';

import { Role } from './Role';
import { SignalingClient, SignalingClientConfig } from './SignalingClient';

describe('SignalingClient', () => {
    let config: Partial<SignalingClientConfig>;

    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    global.crypto = crypto;
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    global.TextEncoder = util.TextEncoder;

    beforeEach(() => {
        config = {
            role: Role.VIEWER,
            clientId: 'TestClientId',
            channelARN: 'arn:aws:us-west-2:kinesisvideo:channel/testChannel/1234567890',
            region: 'us-west-2',
            channelEndpoint: 'ws://localhost:8787',
            credentials: {
                accessKeyId: 'ACCESS_KEY_ID',
                secretAccessKey: 'SECRET_ACCESS_KEY',
                sessionToken: 'SESSION_TOKEN',
            },
        };
    });

    describe('constructor', () => {
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
        let signer: jest.Mock;
        beforeEach(() => {
            signer = jest.fn().mockImplementation(endpoint => new Promise(resolve => resolve(endpoint)));
            config.channelEndpoint = 'ws://localhost:8787';
            config.requestSigner = {
                getSignedURL: signer,
            };
        });

        it('should open a connection to the signaling server as the viewer', done => {
            const client = new SignalingClient(config as SignalingClientConfig);
            client.on('open', () => {
                expect(signer).toBeCalledWith('ws://localhost:8787', {
                    'X-Amz-ChannelARN': 'arn:aws:us-west-2:kinesisvideo:channel/testChannel/1234567890',
                    'X-Amz-ClientId': 'TestClientId',
                });
                done();
            });
            client.open();
        });

        it('should open a connection to the signaling server as the master', done => {
            config.role = Role.MASTER;
            delete config.clientId;
            const client = new SignalingClient(config as SignalingClientConfig);
            client.on('open', () => {
                expect(signer).toBeCalledWith('ws://localhost:8787', {
                    'X-Amz-ChannelARN': 'arn:aws:us-west-2:kinesisvideo:channel/testChannel/1234567890',
                });
                done();
            });
            client.open();
        });

        it('should throw an error when making multiple open requests', () => {
            const client = new SignalingClient(config as SignalingClientConfig);
            expect(() => {
                client.open();
                client.open();
            }).toThrow('Client is already open or opening');
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
});
