import type { ServiceApiParams } from '../../../common.ts';
import { createCryptocurrency } from './createCryptocurrency.ts';

export function createV2PaymentCryptocurrency(this: void, serviceApi: ServiceApiParams) {
  return {
    createCryptocurrency: createCryptocurrency.bind(this, serviceApi)
  };
}

export * from './createCryptocurrency.ts';
