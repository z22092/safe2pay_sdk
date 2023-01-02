import type { ServiceApiParams } from '../../common';
import { changeTransaction } from './changeTransaction';
import { changeTransactionStatusSandbox } from './changeTransactionStatusSandbox';
import { consultPaymentOptions } from './consultPaymentOptions';
import { consultTransaction } from './consultTransaction';
import { consultTransactionByReference } from './consultTransactionByReference';
import { listTransaction } from './listTransactions';

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

export * from './changeTransaction';
export * from './changeTransactionStatusSandbox';
export * from './consultPaymentOptions';
export * from './consultTransaction';
export * from './consultTransactionByReference';
export * from './listTransactions';
