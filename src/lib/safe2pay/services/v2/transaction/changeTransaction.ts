// https://developers.safe2pay.com.br/references/Transaction/transaction_update

import type { ServiceApiParams, ServiceDataParams } from '../../common';
import type { TransactionStatusEnum } from '../../constants';
const PATH = '/Transaction/Update';

export type ChangeTransactionParams = {
  isUpdateReference: boolean;
  isUpdateCallBackUrl: boolean;
};

export type ChangeTransactionData = {
  Id: string;
  CallbackUrl: string;
  Reference: string;
  Application: string;
};

export type ChangeTransactionResponse = {
  IdTransaction: number;
  Status: TransactionStatusEnum;
  Message: string;
};

export async function changeTransaction(
  { api }: ServiceApiParams,
  {
    params,
    data
  }: ServiceDataParams<{ params: ChangeTransactionParams; data: ChangeTransactionData }>,
) {
  return api.put(PATH, data, {
    params
  });
}
