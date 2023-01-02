import type { ConfigType } from '../../client';
import { CONTENT_TYPE, HttpMethodEnum, MimeTypeEnum } from '../../constants';
import { calculateBodyHash, convertToBuffer, generateNonce, generateTimestamp, rfc3986 } from './common';
import { AlgorithmEnum, OAUTH_VERSION } from './constants';
import { sign } from './sign';

export type ConsumerType = { key: string; secret: string };
export type TokenType = { key: string; secret: string };

export type OAuthConfigType = {
  algorithm: AlgorithmEnum;
  includeBodyHash?: boolean | 'auto';
  consumer: ConsumerType;
  token: TokenType;
  realm?: string | undefined;
  callback?: string | null;
  verifier?: string | null;
};

export type OAuthHeadersParserParamsType = {
  method: ConfigType<_>['method'];
  data: string | URLSearchParams | FormData;
  url: ConfigType<_>['url'];
  headers: ConfigType<_>['headers'];
};

const addParamToSign = (key: string, value: string, paramsToSign: Record<string, string | string[]>) => {
  const existingValue = paramsToSign[key];

  if (typeof existingValue === 'string') {
    paramsToSign[key] = [existingValue, value];
    return;
  }

  if (Array.isArray(existingValue)) {
    existingValue.push(value);
    return;
  }

  paramsToSign[key] = value;

  return;
};

const addParamsToSign = (m: URLSearchParams | Record<string, string> | string, paramsToSign: Record<string, string | string[]>) => {
  new URLSearchParams(m).forEach((value, key) => addParamToSign(key, value, paramsToSign));
};

export function createOAuthHeadersParser({ algorithm = AlgorithmEnum['HMAC-SHA256'], includeBodyHash = 'auto', realm, token, callback = null, verifier = null, consumer }: OAuthConfigType) {
  return function ({ data, url = '', headers, method }: OAuthHeadersParserParamsType) {
    const oauthParams: AnyObject<string> = {
      oauth_consumer_key: consumer.key,
      oauth_nonce: generateNonce(),
      oauth_signature_method: algorithm,
      oauth_timestamp: generateTimestamp(),
      oauth_version: OAUTH_VERSION
    };

    if (token) {
      oauthParams.oauth_token = token.key;
    }

    if (callback) {
      oauthParams.oauth_callback = callback;
    }

    if (verifier) {
      oauthParams.oauth_verifier = verifier;
    }

    const oAuthUrl = new URL(url);
    const oAuthHeaders = new Headers(headers);

    const paramsToSign: Record<string, string | string[]> = {};

    addParamsToSign(oauthParams, paramsToSign);

    if (oAuthUrl.search) {
      addParamsToSign(oAuthUrl.searchParams, paramsToSign);
      oAuthUrl.search = '';
    }

    oAuthUrl.hash = '';

    if ((oAuthUrl.protocol === 'https:' && oAuthUrl.port === '443') || (oAuthUrl.protocol === 'http:' && oAuthUrl.port === '80')) {
      oAuthUrl.port = '';
    }

    if (oAuthHeaders.get(CONTENT_TYPE) === MimeTypeEnum.FORM_URLENCODED) {
      addParamsToSign(new URLSearchParams(String(data)), paramsToSign);
    }

    if (includeBodyHash === true || (data && includeBodyHash === 'auto' && (method === HttpMethodEnum.POST || method === HttpMethodEnum.PUT))) {
      const bodyHash = calculateBodyHash(algorithm, convertToBuffer(data));
      oauthParams.oauth_body_hash = bodyHash;
      addParamToSign('oauth_body_hash', bodyHash, paramsToSign);
    }

    oauthParams.oauth_signature = sign({
      signMethod: algorithm,
      httpMethod: method,
      baseUri: oAuthUrl.toString(),
      params: paramsToSign,
      consumerSecret: consumer.secret,
      tokenSecret: token.secret
    });

    if (realm) {
      oauthParams.realm = realm;
    }

    const authorization = [
      'OAuth',
      Object.entries(oauthParams)
        .map((e) => [e[0], '="', rfc3986(e[1]), '"'].join(''))
        .join(',')
    ].join(' ');

    oAuthHeaders.set('Authorization', authorization);
    return oAuthHeaders;
  };
}

export type OAuthHeadersParserType = (_: OAuthHeadersParserParamsType) => Headers;
