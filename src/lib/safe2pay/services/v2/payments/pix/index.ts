import type { ServiceApiParams } from '../../../common';
import { cancelPix } from './cancelPix';
import { createDynamicPix } from './createDynamicPix';
import { createStaticPix } from './createStaticPix';

export function createV2PaymentPix(this: void, serviceApi: ServiceApiParams) {
  return {
    cancelPix: cancelPix.bind(this, serviceApi),
    createDynamicPix: createDynamicPix.bind(this, serviceApi),
    createStaticPix: createStaticPix.bind(this, serviceApi)
  };
}

export * from './cancelPix';
export * from './createDynamicPix';
export * from './createStaticPix';
