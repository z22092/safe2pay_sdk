import type { ServiceApiParams } from '../../common.ts';
import { changeTransaction } from './changeTransaction.ts';
import { changeTransactionStatusSandbox } from './changeTransactionStatusSandbox.ts';
import { consultPaymentOptions } from './consultPaymentOptions.ts';
import { consultTransaction } from './consultTransaction.ts';
import { consultTransactionByReference } from './consultTransactionByReference.ts';
import { listTransaction } from './listTransactions.ts';

export function createV2Transaction(this: void, serviceApi: ServiceApiParams) {
  return {
    changeTransaction: changeTransaction.bind(this, serviceApi),
    changeTransactionStatusSandbox: changeTransactionStatusSandbox.bind(this, serviceApi),
    consultPaymentOptions: consultPaymentOptions.bind(this, serviceApi),
    consultTransaction: consultTransaction.bind(this, serviceApi),
    consultTransactionByReference: consultTransactionByReference.bind(this, serviceApi),
    listTransaction: listTransaction.bind(this, serviceApi)
  };
}

export * from './changeTransaction.ts';
export * from './changeTransactionStatusSandbox.ts';
export * from './consultPaymentOptions.ts';
export * from './consultTransaction.ts';
export * from './consultTransactionByReference.ts';
export * from './listTransactions.ts';
