import type { ServiceApiParams } from '../../../common.ts';
import { cancelBoleto } from './cancelBoleto.ts';
import { createBoleto } from './createBoleto.ts';
import { releaseBoleto } from './releaseBoleto.ts';

export function createV2PaymentBoleto(this: void, serviceApi: ServiceApiParams) {
  return {
    cancelBoleto: cancelBoleto.bind(this, serviceApi),
    createBoleto: createBoleto.bind(this, serviceApi),
    releaseBoleto: releaseBoleto.bind(this, serviceApi)
  };
}

export * from './common.ts';
export * from './cancelBoleto.ts';
export * from './cancelBoleto.ts';
export * from './createBoleto.ts';
export * from './releaseBoleto.ts';
