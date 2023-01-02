// https://developers.safe2pay.com.br/references/Payment/payment_writeoffbankslip

import type { ServiceDataParams, ServiceApiParams } from '../../../common';

const PATH = '/BankSlip/WriteOffBankSlip';

export type CancelBoletoParams = {
  idTransaction: NumericalString;
};

export type CancelBoletoResponse = true;

export async function cancelBoleto(
  { api }: ServiceApiParams,
  { params }: ServiceDataParams<{ params: CancelBoletoParams }>,
) {
  return api.delete<CancelBoletoParams>(PATH, params);
}
