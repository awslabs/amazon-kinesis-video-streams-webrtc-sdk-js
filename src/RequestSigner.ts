import { QueryParams } from './QueryParams';

export interface RequestSigner {
    getSignedURL: (signalingEndpoint: string, queryParams: QueryParams, date?: Date) => Promise<string>;
}
