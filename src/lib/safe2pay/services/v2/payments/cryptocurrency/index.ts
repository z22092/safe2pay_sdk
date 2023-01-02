import type { ServiceApiParams } from '../../../common';
import { createCryptocurrency } from './createCryptocurrency';

export function createV2PaymentCryptocurrency(this: void, serviceApi: ServiceApiParams) {
  return {
    createCryptocurrency: createCryptocurrency.bind(this, serviceApi)
  };
}

export * from './createCryptocurrency';
