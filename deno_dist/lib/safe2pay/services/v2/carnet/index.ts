import type { ServiceApiParams } from '../../common.ts';
import { cancelCarnet } from './cancelCarnet.ts';
import { consultCarnetBatch } from './consultCarnetBatch.ts';
import { createCarnet } from './createCarnet.ts';
import { resendCarnet } from './resendCarnet.ts';

export function createV2Carnet(this: void, serviceApi: ServiceApiParams) {
  return {
    cancelCarnet: cancelCarnet.bind(this, serviceApi),
    consultCarnetBatch: consultCarnetBatch.bind(this, serviceApi),
    createCarnet: createCarnet.bind(this, serviceApi),
    resendCarnet: resendCarnet.bind(this, serviceApi)
  };
}

export * from './cancelCarnet.ts';
export * from './consultCarnetBatch.ts';
export * from './createCarnet.ts';
export * from './resendCarnet.ts';
