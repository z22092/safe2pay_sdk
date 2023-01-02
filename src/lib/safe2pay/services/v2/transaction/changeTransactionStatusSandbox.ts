// https://developers.safe2pay.com.br/references/Transaction/transaction_update_sandbox

import type { ServiceApiParams, ServiceDataParams, RequestBodyBase } from '../../common';
import type { TransactionStatusEnum } from '../../constants';
const PATH = '/Transaction/UpdateSandboxTransaction';

export type ChangeTransactionStatusSandboxParams = {
  idTransaction: number;
  idTransactionStatus: TransactionStatusEnum;
};

export type ChangeTransactionStatusSandboxResponse = {
  IsSandbox: RequestBodyBase<AnyObject>['IsSandbox'];
};

export async function changeTransactionStatusSandbox({ api }: ServiceApiParams, { params }: ServiceDataParams<{ params: ChangeTransactionStatusSandboxParams }>) {
  return api.put<_, ChangeTransactionStatusSandboxResponse>(PATH, null, {
    params
  });
}
