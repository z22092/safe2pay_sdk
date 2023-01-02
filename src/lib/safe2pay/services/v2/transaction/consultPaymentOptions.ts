// https://developers.safe2pay.com.br/references/Payment/payment_methods

import type { ServiceApiParams } from '../../common';
const PATH = '/MerchantPaymentMethod/List';

export type PaymentOptions = {
  PaymentMethod: {
    Code: NumericalString;
    Name: string;
  };
  IsEnabled: boolean;
  InstallmentLimit: number;
  MinorInstallmentAmount: number;
  IsInstallmentEnable: boolean;
};

export type ConsultPaymentOptionsResponse = PaymentOptions[];

export async function consultPaymentOptions({ api }: ServiceApiParams) {
  return api.get<ConsultPaymentOptionsResponse>(PATH);
}
