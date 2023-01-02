// https://developers.safe2pay.com.br/references/Payment/payment_alterbankslip

import type { ServiceDataParams, ServiceApiParams } from '../../../common.ts';
import type { PaymentMethodEnum } from '../../../constants.ts';
import type { BaseBoletoResponse } from './common.ts';

const PATH = '/Payment';

export const ChangeBoletoCommandEnum = {
  DUE_DATE: 1,
  DISCOUNT_PAYMENT: 2,
  CANCEL_DISCOUNT_PAYMENT: 3,
  DISCOUNT_AMOUNT: 4,
  CANCEL_DISCOUNT_AMOUNT: 5
} as const;

export type ChangeBoletoCommandEnum = ValuesMap<typeof ChangeBoletoCommandEnum>;

export type PaymentObjectChangeBoletoBase = {
  Command: ChangeBoletoCommandEnum;
  DueDate: `${DateDayType}/${DateMonthType}/${DateYearType}`;
  DiscountPayment: number;
  DiscountDue: `${DateDayType}/${DateMonthType}/${DateYearType}`;
  DiscountAmount: number;
};

export type PaymentObjectChangeBoletoDueDate = Pick<
  PaymentObjectChangeBoletoBase,
  'Command' | 'DueDate'
> & {
  Command: typeof ChangeBoletoCommandEnum.DUE_DATE;
};

export type PaymentObjectChangeBoletoDiscountPayment = Pick<
  PaymentObjectChangeBoletoBase,
  'Command' | 'DiscountPayment'
> & {
  Command: typeof ChangeBoletoCommandEnum.DISCOUNT_PAYMENT;
};

export type PaymentObjectChangeBoletoCancelDiscountPayment = Pick<
  PaymentObjectChangeBoletoBase,
  'Command'
> & {
  Command: typeof ChangeBoletoCommandEnum.CANCEL_DISCOUNT_PAYMENT;
};

export type PaymentObjectChangeBoletoDiscountAmount = Pick<
  PaymentObjectChangeBoletoBase,
  'Command' | 'DiscountAmount' | 'DiscountDue'
> & {
  Command: typeof ChangeBoletoCommandEnum.DISCOUNT_AMOUNT;
};

export type PaymentObjectChangeBoletoCancelDiscountAmount = Pick<
  PaymentObjectChangeBoletoBase,
  'Command'
> & {
  Command: typeof ChangeBoletoCommandEnum.CANCEL_DISCOUNT_AMOUNT;
};

export type PaymentObjectChangeBoleto =
  | PaymentObjectChangeBoletoDueDate
  | PaymentObjectChangeBoletoDiscountPayment
  | PaymentObjectChangeBoletoCancelDiscountPayment
  | PaymentObjectChangeBoletoDiscountAmount
  | PaymentObjectChangeBoletoCancelDiscountAmount;

export type ChangeBoletoData = {
  Id: number;
  PaymentMethod: PaymentMethodEnum;
  PaymentObject: PaymentObjectChangeBoleto;
};

export type ChangeBoletoResponse = BaseBoletoResponse;

export async function changeBoleto(
  { payment }: ServiceApiParams,
  { data }: ServiceDataParams<{ data: ChangeBoletoData }>,
) {
  return payment.post<ChangeBoletoData, ChangeBoletoResponse>(PATH, data);
}
