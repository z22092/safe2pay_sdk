// https://developers.safe2pay.com.br/references/Transaction/transaction_get

import type { ServiceApiParams, ServiceDataParams } from '../../common.ts';
import type { TransactionsObjectResponse } from './common.ts';

const PATH = '/transaction/Get';

export type ConsultTransactionParams = {
  Id: number;
};

export async function consultTransaction<M extends AnyObject, T extends AnyObject>(
  { api }: ServiceApiParams,
  { params }: ServiceDataParams<{ params: ConsultTransactionParams }>,
) {
  return api.get<TransactionsObjectResponse<M, T>>(PATH, params);
}
