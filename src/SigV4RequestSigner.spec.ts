import { QueryParams } from './QueryParams';
import { SigV4RequestSigner } from './SigV4RequestSigner';
import { Credentials } from './SignalingClient';

describe('SigV4RequestSigner', () => {
    let region: string;
    let credentials: Credentials;
    let signer: SigV4RequestSigner;
    let queryParams: QueryParams;
    let date: Date;

    beforeEach(() => {
        region = 'us-west-2';
        credentials = {
            accessKeyId: 'AKIA4F7WJQR7FMMWMNXI',
            secretAccessKey: 'FakeSecretKey',
            sessionToken: 'FakeSessionToken',
        };
        signer = new SigV4RequestSigner(region, credentials);
        queryParams = {
            'X-Amz-TestParam': 'test-param-value',
        };
        date = new Date('2019-12-01T00:00:00.000Z');
    });

    describe('getSignedURL', () => {
        it('should fail when the endpoint is not a WSS endpoint', async () => {
            await expect(signer.getSignedURL('https://kvs.awsamazon.com', queryParams, date)).rejects.toBeTruthy();
        });

        it('should fail when the endpoint contains query params', async () => {
            await expect(signer.getSignedURL('wss://kvs.awsamazon.com?a=b', queryParams, date)).rejects.toBeTruthy();
        });

        const expectedSignedURL =
            'wss://kvs.awsamazon.com/?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIA4F7WJQR7FMMWMNXI%2F20191201%2Fus-west-2%2Fkinesisvideo%2Faws4_request&X-Amz-Date=20191201T000000Z&X-Amz-Expires=299&X-Amz-Security-Token=FakeSessionToken&X-Amz-Signature=fc268038be276315822b4f73eafd28ee3a5632a2a35fdb0a88db9a42b13d6c92&X-Amz-SignedHeaders=host&X-Amz-TestParam=test-param-value';
        it('should generate a valid signed URL with static credentials', async () => {
            await expect(signer.getSignedURL('wss://kvs.awsamazon.com', queryParams, date)).resolves.toBe(expectedSignedURL);
        });

        it('should generate a valid signed URL with dynamic credentials', async () => {
            credentials = {
                accessKeyId: null,
                secretAccessKey: null,
                getPromise(): Promise<void> {
                    return new Promise<void>(resolve => {
                        credentials.accessKeyId = 'AKIA4F7WJQR7FMMWMNXI';
                        credentials.secretAccessKey = 'FakeSecretKey';
                        credentials.sessionToken = 'FakeSessionToken';
                        resolve();
                    });
                },
            };
            signer = new SigV4RequestSigner(region, credentials);
            await expect(signer.getSignedURL('wss://kvs.awsamazon.com', queryParams, date)).resolves.toBe(expectedSignedURL);
        });

        it('should generate a valid signed URL without a session token', async () => {
            delete credentials.sessionToken;
            signer = new SigV4RequestSigner(region, credentials);
            await expect(signer.getSignedURL('wss://kvs.awsamazon.com', queryParams, date)).resolves.toBe(
                'wss://kvs.awsamazon.com/?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIA4F7WJQR7FMMWMNXI%2F20191201%2Fus-west-2%2Fkinesisvideo%2Faws4_request&X-Amz-Date=20191201T000000Z&X-Amz-Expires=299&X-Amz-Signature=be1e78950d956a8a9a1997417099ddbd7455619f3d08c4ad20e1e272179ca695&X-Amz-SignedHeaders=host&X-Amz-TestParam=test-param-value',
            );
        });

        it('should generate a valid signed URL with a service override', async () => {
            signer = new SigV4RequestSigner(region, credentials, 'firehose');
            await expect(signer.getSignedURL('wss://kvs.awsamazon.com', queryParams, date)).resolves.toBe(
                'wss://kvs.awsamazon.com/?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIA4F7WJQR7FMMWMNXI%2F20191201%2Fus-west-2%2Ffirehose%2Faws4_request&X-Amz-Date=20191201T000000Z&X-Amz-Expires=299&X-Amz-Security-Token=FakeSessionToken&X-Amz-Signature=f15308513d21a381d38b7607a0439f25fc2e6c9f5ff56a48c1664b486e6234d5&X-Amz-SignedHeaders=host&X-Amz-TestParam=test-param-value',
            );
        });

        it('should generate a valid signed URL with a path', async () => {
            await expect(signer.getSignedURL('wss://kvs.awsamazon.com/path/path/path', queryParams, date)).resolves.toBe(
                'wss://kvs.awsamazon.com/path/path/path?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIA4F7WJQR7FMMWMNXI%2F20191201%2Fus-west-2%2Fkinesisvideo%2Faws4_request&X-Amz-Date=20191201T000000Z&X-Amz-Expires=299&X-Amz-Security-Token=FakeSessionToken&X-Amz-Signature=0bf3df6ca23d8d82f688e8dbfb90d69e74843d40038541b1721c545eef7612a4&X-Amz-SignedHeaders=host&X-Amz-TestParam=test-param-value',
            );
        });

        it('should generate a valid signed URL without a mocked date', async () => {
            await expect(signer.getSignedURL('wss://kvs.awsamazon.com', queryParams)).resolves.toBeTruthy();
        });
    });
});
