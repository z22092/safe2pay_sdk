// https://developers.safe2pay.com.br/references/Payment/payment_installment_value

import type { ServiceApiParams, ServiceDataParams } from '../../../common.ts';
const PATH = '/CreditCard/InstallmentValue/';

export type Installment = {
  Installments: number;
  InstallmentValue: number;
  TotalValue: number;
  AppliedTax: number;
};

export type ConsultInstallmentValuesParams = {
  amount: NumericalString;
};

export type ConsultInstallmentValuesResponse = {
  Installments: Installment[];
};

export async function consultInstallmentValues(
  { api }: ServiceApiParams,
  { params }: ServiceDataParams<{ params: ConsultInstallmentValuesParams }>,
) {
  return api.get<ConsultInstallmentValuesResponse>(PATH, params);
}
