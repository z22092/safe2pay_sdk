// https://developers.safe2pay.com.br/references/Transaction/transaction_get_reference

import type { ServiceApiParams, ServiceDataParams } from '../../common.ts';
import type { TransactionsObjectResponse } from './common.ts';

const PATH = '/transaction/Reference';

export type ConsultTransactionByReferenceParams = {
  reference: string;
};

export type ConsultTransactionByReferenceResponse<M extends AnyObject, T extends AnyObject> = {
  TotalItems: number;
  Objects: Without<TransactionsObjectResponse<M, T>, 'Meta'>[];
};

export async function consultTransactionByReference<M extends AnyObject, T extends AnyObject>(
  { api }: ServiceApiParams,
  { params }: ServiceDataParams<{ params: ConsultTransactionByReferenceParams }>,
) {
  return api.get<ConsultTransactionByReferenceResponse<M, T>>(PATH, params);
}
