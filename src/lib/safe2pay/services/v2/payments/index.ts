import type { ServiceApiParams } from '../../common';
import { createV2PaymentBoleto } from './boleto';
import { createV2PaymentCreditCard } from './creditCard';
import { createV2PaymentCryptocurrency } from './cryptocurrency';
import { createV2PaymentPix } from './pix';

export function createV2Payment(this: void, serviceApi: ServiceApiParams) {
  return {
    ...createV2PaymentBoleto.apply(this, [serviceApi]),
    ...createV2PaymentCreditCard.apply(this, [serviceApi]),
    ...createV2PaymentCryptocurrency.apply(this, [serviceApi]),
    ...createV2PaymentPix.apply(this, [serviceApi])
  };
}

export * as boleto from './boleto';
export * as creditCard from './creditCard';
export * as cryptocurrency from './cryptocurrency';
export * as pix from './pix';
