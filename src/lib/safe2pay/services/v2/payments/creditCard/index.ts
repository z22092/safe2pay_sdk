import type { ServiceApiParams } from '../../../common';
import { cancelCreditCard } from './cancelCreditCard';
import { captureCreditCard } from './captureCreditCard';
import { consultInstallmentValues } from './consultInstallmentValues';
import { createCreditCard } from './createCreditCard';

export function createV2PaymentCreditCard(this: void, serviceApi: ServiceApiParams) {
  return {
    cancelCreditCard: cancelCreditCard.bind(this, serviceApi),
    captureCreditCard: captureCreditCard.bind(this, serviceApi),
    consultInstallmentValues: consultInstallmentValues.bind(this, serviceApi),
    createCreditCard: createCreditCard.bind(this, serviceApi)
  };
}

export * from './cancelCreditCard';
export * from './captureCreditCard';
export * from './common';
export * from './consultInstallmentValues';
export * from './createCreditCard';
