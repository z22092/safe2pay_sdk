import { Buffer } from "https://deno.land/std@0.170.0/node/buffer.ts";
import type { BinaryLike, KeyLike, SignKeyObjectInput, SignPrivateKeyInput } from 'https://deno.land/std@0.170.0/node/crypto.ts';
import { createHash, createHmac, createSign, randomBytes } from 'https://deno.land/std@0.170.0/node/crypto.ts';
import { AlgorithmEnum, BASE64, ShaAlgorithmEnum } from './constants.ts';
import type { SignOptions } from './sign.ts';

export function sha(key: BinaryLike, body: BinaryLike, algorithm: ShaAlgorithmEnum) {
  return createHmac(algorithm, key).update(body).digest(BASE64);
}

export function rsa(key: KeyLike | SignKeyObjectInput | SignPrivateKeyInput, body: BinaryLike) {
  return createSign(AlgorithmEnum['RSA-SHA1']).update(body).sign(key, BASE64);
}

export function generateNonce(size = 16) {
  return randomBytes(0 | (size * 0.75)).toString(BASE64);
}

export function generateTimestamp() {
  return Math.floor(Date.now() / 1000).toString();
}

export function rfc3986(str: string) {
  return new URLSearchParams(str).toString();
}

export function compare(a: string, b: string) {
  if (a > b) return 1;
  if (a < b) return -1;
  return 0;
}

export function calculateBodyHash(signatureMethod: SignOptions['signMethod'], body: Buffer) {
  return createHash(signatureMethod === AlgorithmEnum['HMAC-SHA1'] ? ShaAlgorithmEnum.SHA1 : ShaAlgorithmEnum.SHA256)
    .update(body)
    .digest(BASE64);
}

export function convertToBuffer(data: string | URLSearchParams | FormData): Buffer {
  return Buffer.from(data.toString());
}
