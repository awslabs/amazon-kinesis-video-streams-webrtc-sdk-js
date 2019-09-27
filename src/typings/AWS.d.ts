declare namespace AWS {
    export interface Credentials {
        accessKeyId: string;
        secretAccessKey: string;
        sessionToken?: string;
    }
}
