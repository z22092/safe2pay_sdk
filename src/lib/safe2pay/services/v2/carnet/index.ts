import type { ServiceApiParams } from '../../common';
import { cancelCarnet } from './cancelCarnet';
import { consultCarnetBatch } from './consultCarnetBatch';
import { createCarnet } from './createCarnet';
import { resendCarnet } from './resendCarnet';

export function createV2Carnet(this: void, serviceApi: ServiceApiParams) {
  return {
    cancelCarnet: cancelCarnet.bind(this, serviceApi),
    consultCarnetBatch: consultCarnetBatch.bind(this, serviceApi),
    createCarnet: createCarnet.bind(this, serviceApi),
    resendCarnet: resendCarnet.bind(this, serviceApi)
  };
}

export * from './cancelCarnet';
export * from './consultCarnetBatch';
export * from './createCarnet';
export * from './resendCarnet';
