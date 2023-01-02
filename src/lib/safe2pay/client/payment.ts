import { createApi, MimeTypeEnum } from '../../../lib/httpClient';
import { parserSafe2PayResponse } from '../common';
import { SAFE2PAY_URL_PAYMENT as baseURL } from '../constants';

const DEFAULT_CONTENT_TYPE = MimeTypeEnum.APPLICATION_JSON;

export function createSafe2PayPayment(apiKey: string) {
  return createApi({
    baseURL,
    headers: {
      'Content-Type': DEFAULT_CONTENT_TYPE,
      'X-API-KEY': apiKey
    },
    parser: parserSafe2PayResponse
  });
}

export type Safe2PayPayment = ReturnType<typeof createSafe2PayPayment>;
