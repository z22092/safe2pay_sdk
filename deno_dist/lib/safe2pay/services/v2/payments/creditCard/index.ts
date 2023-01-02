import type { ServiceApiParams } from '../../../common.ts';
import { cancelCreditCard } from './cancelCreditCard.ts';
import { captureCreditCard } from './captureCreditCard.ts';
import { consultInstallmentValues } from './consultInstallmentValues.ts';
import { createCreditCard } from './createCreditCard.ts';

export function createV2PaymentCreditCard(this: void, serviceApi: ServiceApiParams) {
  return {
    cancelCreditCard: cancelCreditCard.bind(this, serviceApi),
    captureCreditCard: captureCreditCard.bind(this, serviceApi),
    consultInstallmentValues: consultInstallmentValues.bind(this, serviceApi),
    createCreditCard: createCreditCard.bind(this, serviceApi)
  };
}

export * from './cancelCreditCard.ts';
export * from './captureCreditCard.ts';
export * from './common.ts';
export * from './consultInstallmentValues.ts';
export * from './createCreditCard.ts';
