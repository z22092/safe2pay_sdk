// https://developers.safe2pay.com.br/references/Transaction/transaction_list

import type { ServiceApiParams, ServiceDataParams } from '../../common';

import type { PaymentMethodEnum, TransactionStatusEnum } from '../../constants';
import type { TransactionsObjectResponse } from './common';

const PATH = '/Transaction/List';

type ObjectCustomerConsultTransactionParams = {
  Name?: string;
  Identity?: string;
};

type ObjectPaymentMethodConsultTransactionParams = {
  Code?: PaymentMethodEnum;
};

type ObjectTransactionStatusConsultTransactionParams = {
  Code?: TransactionStatusEnum;
};

type ObjectConsultTransactionParams = {
  IsSandbox: boolean;
  Id?: number;
  Reference?: string;
  Application?: string;
  Vendor?: string;
  Customer?: ObjectCustomerConsultTransactionParams;
  PaymentMethod?: ObjectPaymentMethodConsultTransactionParams;
  TransactionStatus?: ObjectTransactionStatusConsultTransactionParams;
};

export type ListTransactionParams = {
  PageNumber: number;
  RowsPerPage: number;
  CreatedDateInitial?: DateType;
  CreatedDateEnd?: DateType;
  PaymentDateInitial?: DateType;
  PaymentDateEnd?: DateType;
  AmountInitial?: number;
  AmountEnd?: number;
  Object: ObjectConsultTransactionParams;
};

export type ListTransactionsResponse<M extends AnyObject, T extends AnyObject> = {
  TotalItems: number;
  Objects: Without<TransactionsObjectResponse<M, T>, 'Meta'>[];
};

export async function listTransaction<M extends AnyObject, T extends AnyObject>(
  { api }: ServiceApiParams,
  { params }: ServiceDataParams<{ params: ListTransactionParams }>,
) {
  return api.get<ListTransactionsResponse<M, T>>(PATH, params);
}
