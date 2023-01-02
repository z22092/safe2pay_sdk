import type { ServiceApiParams } from '../../../common.ts';
import { cancelPix } from './cancelPix.ts';
import { createDynamicPix } from './createDynamicPix.ts';
import { createStaticPix } from './createStaticPix.ts';

export function createV2PaymentPix(this: void, serviceApi: ServiceApiParams) {
  return {
    cancelPix: cancelPix.bind(this, serviceApi),
    createDynamicPix: createDynamicPix.bind(this, serviceApi),
    createStaticPix: createStaticPix.bind(this, serviceApi)
  };
}

export * from './cancelPix.ts';
export * from './createDynamicPix.ts';
export * from './createStaticPix.ts';
