import type { ServiceApiParams } from '../../common';
import { createToken } from './createToken';
import { deleteToken } from './deleteToken';
import { listToken } from './listToken';

export function createV2Token(this: void, serviceApi: ServiceApiParams) {
  return {
    createToken: createToken.bind(this, serviceApi),
    deleteToken: deleteToken.bind(this, serviceApi),
    listToken: listToken.bind(this, serviceApi)
  };
}

export * from './createToken';
export * from './deleteToken';
export * from './listToken';
