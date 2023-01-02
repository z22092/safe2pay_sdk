// https://developers.safe2pay.com.br/references/Payment/payment_bankslip

import type { ServiceDataParams, ServiceApiParams, RequestBodyBase } from '../../../common.ts';
import { PaymentMethodEnum } from '../../../constants.ts';
import type { DiscountTypeEnum } from '../../../constants.ts';
import type { BaseBoletoResponse } from './common.ts';
const PATH = '/Payment';

export type PaymentObjectCreateBoleto = {
  DueDate: `${DateDayType}/${DateMonthType}/${DateYearType}`;
  Instruction: string;
  Message?: Tuple<string, 9>;
  PenaltyRate?: number;
  InterestRate?: number;
  CancelAfterDue?: boolean;
  DaysBeforeCancel?: number;
  IsEnablePartialPayment?: boolean;
  DiscountAmount?: number;
  DiscountType?: DiscountTypeEnum;
  DiscountDue?: `${DateDayType}/${DateMonthType}/${DateYearType}`;
};

export type CreateBoletoData<T extends AnyObject> = RequestBodyBase<T> & {
  PaymentMethod?: typeof PaymentMethodEnum.BOLETO;
  PaymentObject: PaymentObjectCreateBoleto;
};

export type CreateBoletoResponse = BaseBoletoResponse;

export async function createBoleto<T extends AnyObject>({ payment }: ServiceApiParams, { data }: ServiceDataParams<{ data: CreateBoletoData<T> }>) {
  return payment.post<CreateBoletoData<T>, CreateBoletoResponse>(PATH, { ...data, PaymentMethod: PaymentMethodEnum.BOLETO });
}
