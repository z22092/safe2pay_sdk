// https://developers.safe2pay.com.br/references/Payment/payment_releasebankslip

import type { ServiceApiParams, ServiceDataParams } from '../../../common';
const PATH = '/BankSlip/ReleaseBankSlip';

export type ReleaseBoletoParams = {
  idTransaction: NumericalString;
};

export type ReleaseBoletoResponse = true;

export async function releaseBoleto(
  { api }: ServiceApiParams,
  { params }: ServiceDataParams<{ params: ReleaseBoletoParams }>,
) {
  return api.get<ReleaseBoletoResponse>(PATH, params);
}
