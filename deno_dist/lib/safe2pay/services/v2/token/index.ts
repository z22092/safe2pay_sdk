import type { ServiceApiParams } from '../../common.ts';
import { createToken } from './createToken.ts';
import { deleteToken } from './deleteToken.ts';
import { listToken } from './listToken.ts';

export function createV2Token(this: void, serviceApi: ServiceApiParams) {
  return {
    createToken: createToken.bind(this, serviceApi),
    deleteToken: deleteToken.bind(this, serviceApi),
    listToken: listToken.bind(this, serviceApi)
  };
}

export * from './createToken.ts';
export * from './deleteToken.ts';
export * from './listToken.ts';
