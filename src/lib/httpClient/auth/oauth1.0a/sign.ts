import type { KeyLike, SignKeyObjectInput, SignPrivateKeyInput } from 'crypto';

import { mapsObjectToBiDimensionalArray } from '../../common';
import { HttpMethodEnum } from '../../constants';
import { compare, rfc3986, rsa, sha } from './common';
import { AlgorithmEnum, ShaAlgorithmEnum } from './constants';

export type SignOptions = {
  signMethod: AlgorithmEnum;
  httpMethod: HttpMethodEnum;
  baseUri: string;
  params: Record<string, string | string[]>;
  consumerSecret: string;
  tokenSecret?: string | null;
  privateKey?: string;
};

function generateBase(
  httpMethod: SignOptions['httpMethod'],
  baseUri: SignOptions['baseUri'],
  params: SignOptions['params'],
) {
  const normalized = [];

  for (const data of mapsObjectToBiDimensionalArray(params)) {
    normalized.push([rfc3986(data[0]), rfc3986(data[1] || '')]);
  }

  return [
    rfc3986(httpMethod?.toUpperCase() || HttpMethodEnum.GET),
    rfc3986(baseUri),
    rfc3986(
      normalized
        .sort((a: string[], b: string[]) => {
          return compare(a[0], b[0]) || compare(a[1], b[1]);
        })
        .map(function (p) {
          return p.join('=');
        })
        .join('&'),
    )
  ].join('&');
}

export function hmacsign(
  httpMethod: SignOptions['httpMethod'],
  baseUri: SignOptions['baseUri'],
  params: SignOptions['params'],
  consumerSecret = '',
  tokenSecret = '',
) {
  const base = generateBase(httpMethod, baseUri, params);
  const key = [consumerSecret, tokenSecret].map(rfc3986).join('&');

  return sha(key, base, ShaAlgorithmEnum.SHA1);
}

export function hmacsign256(
  httpMethod: SignOptions['httpMethod'],
  baseUri: SignOptions['baseUri'],
  params: SignOptions['params'],
  consumerSecret = '',
  tokenSecret = '',
) {
  const base = generateBase(httpMethod, baseUri, params);
  const key = [consumerSecret, tokenSecret].map(rfc3986).join('&');

  return sha(key, base, 'sha256');
}

export function rsasign(
  httpMethod: SignOptions['httpMethod'],
  baseUri: SignOptions['baseUri'],
  params: SignOptions['params'],
  privateKey: KeyLike | SignKeyObjectInput | SignPrivateKeyInput = '',
) {
  const base = generateBase(httpMethod, baseUri, params);
  return rsa(privateKey, base);
}

export function plaintext(consumerSecret = '', tokenSecret = '') {
  return [consumerSecret, tokenSecret].map(rfc3986).join('&');
}

export function sign({
  signMethod,
  httpMethod,
  baseUri,
  params,
  consumerSecret,
  tokenSecret,
  privateKey
}: Partial<SignOptions>) {
  switch (signMethod) {
    case AlgorithmEnum['PLAINTEXT']:
      return plaintext(consumerSecret, tokenSecret as string);
    case AlgorithmEnum['RSA-SHA1']:
      return rsasign(
        httpMethod as HttpMethodEnum,
        baseUri as string,
        params as Record<string, string | string[]>,
        privateKey,
      );
    case AlgorithmEnum['HMAC-SHA1']:
      return hmacsign(
        httpMethod as HttpMethodEnum,
        baseUri as string,
        params as Record<string, string | string[]>,
        consumerSecret,
        tokenSecret as string,
      );
    case AlgorithmEnum['HMAC-SHA256']:
      return hmacsign256(
        httpMethod as HttpMethodEnum,
        baseUri as string,
        params as Record<string, string | string[]>,
        consumerSecret,
        tokenSecret as string,
      );
    default:
      throw new Error('Signature method not supported: ' + signMethod);
  }
}
