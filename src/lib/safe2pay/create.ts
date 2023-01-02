import { createSafe2PayApi, createSafe2PayPayment } from './client';
import type { ServiceApiParams } from './services';
import { createV2Carnet } from './services/v2/carnet';
import { createV2Payment } from './services/v2/payments';
import { createV2Token } from './services/v2/token';
import { createV2Transaction } from './services/v2/transaction';

function createV2Api(this: void, serviceApi: ServiceApiParams) {
  return {
    ...createV2Carnet.apply(this, [serviceApi]),
    ...createV2Payment.apply(this, [serviceApi]),
    ...createV2Token.apply(this, [serviceApi]),
    ...createV2Transaction.apply(this, [serviceApi])
  };
}

export function createSafe2pay(this: void, apiKey: string) {
  const serviceApi: ServiceApiParams = {
    api: createSafe2PayApi(apiKey),
    payment: createSafe2PayPayment(apiKey)
  };

  return createV2Api.apply(this, [serviceApi]);
}
