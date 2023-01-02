// https://developers.safe2pay.com.br/references/Carnet/carnet_cancel

import type { ServiceApiParams, ServiceDataParams } from '../../common';
const PATH = '/Carnet/Delete';

export type CancelCarnetParams = {
  identifier: string;
};

export type CancelCarnetBankSlipsType = {
  IdTransaction: string;
  isCancelled: boolean;
  Message: string;
  BankSlipNumber: string;
};

export type CancelCarnetResponse = {
  BankSlips: CancelCarnetBankSlipsType[];
};

export async function cancelCarnet(
  { api }: ServiceApiParams,
  { params }: ServiceDataParams<{ params: CancelCarnetParams }>,
) {
  return api.delete<CancelCarnetResponse>(PATH, params);
}
