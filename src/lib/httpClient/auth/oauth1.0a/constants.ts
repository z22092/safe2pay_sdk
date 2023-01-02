export const BASE64 = 'base64';
export const OAUTH_VERSION = '1.0';

export const AlgorithmEnum = {
  'HMAC-SHA1': 'HMAC-SHA1',
  'HMAC-SHA256': 'HMAC-SHA256',
  'RSA-SHA1': 'RSA-SHA1',
  PLAINTEXT: 'PLAINTEXT'
} as const;

export const ShaAlgorithmEnum = {
  SHA1: 'sha1',
  SHA256: 'sha256'
} as const;

export type AlgorithmEnum = ValuesMap<typeof AlgorithmEnum>
export type ShaAlgorithmEnum = ValuesMap<typeof ShaAlgorithmEnum>
