declare namespace AWS {
    interface DateUtil {
        iso8601: (date: Date) => string;
    }

    type OutputType = 'buffer' | 'hex';

    interface CryptoUtil {
        hmac: <T extends OutputType>(data: string | Buffer, key: string, outputType: T, algorithm?: string) => ({ buffer: Buffer; hex: string })[T];
        sha256: <T extends OutputType>(data: string | Buffer, outputType: T) => ({ buffer: Buffer; hex: string })[T];
    }

    interface Util {
        date: DateUtil;
        crypto: CryptoUtil;
    }

    export const util: Util;

    export interface Credentials {
        accessKeyId: string;
        secretAccessKey: string;
        sessionToken?: string;
    }
}
