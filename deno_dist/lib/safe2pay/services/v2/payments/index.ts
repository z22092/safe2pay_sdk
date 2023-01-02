import type { ServiceApiParams } from '../../common.ts';
import { createV2PaymentBoleto } from './boleto/index.ts';
import { createV2PaymentCreditCard } from './creditCard/index.ts';
import { createV2PaymentCryptocurrency } from './cryptocurrency/index.ts';
import { createV2PaymentPix } from './pix/index.ts';

export function createV2Payment(this: void, serviceApi: ServiceApiParams) {
  return {
    ...createV2PaymentBoleto.apply(this, [serviceApi]),
    ...createV2PaymentCreditCard.apply(this, [serviceApi]),
    ...createV2PaymentCryptocurrency.apply(this, [serviceApi]),
    ...createV2PaymentPix.apply(this, [serviceApi])
  };
}

export * as boleto from './boleto/index.ts';
export * as creditCard from './creditCard/index.ts';
export * as cryptocurrency from './cryptocurrency/index.ts';
export * as pix from './pix/index.ts';
