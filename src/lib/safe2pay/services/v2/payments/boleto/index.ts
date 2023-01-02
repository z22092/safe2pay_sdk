import type { ServiceApiParams } from '../../../common';
import { cancelBoleto } from './cancelBoleto';
import { createBoleto } from './createBoleto';
import { releaseBoleto } from './releaseBoleto';

export function createV2PaymentBoleto(this: void, serviceApi: ServiceApiParams) {
  return {
    cancelBoleto: cancelBoleto.bind(this, serviceApi),
    createBoleto: createBoleto.bind(this, serviceApi),
    releaseBoleto: releaseBoleto.bind(this, serviceApi)
  };
}

export * from './common';
export * from './cancelBoleto';
export * from './cancelBoleto';
export * from './createBoleto';
export * from './releaseBoleto';
