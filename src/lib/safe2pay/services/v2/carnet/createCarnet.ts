// https://developers.safe2pay.com.br/references/Carnet/carnet

import type { RequestBodyBase, ServiceApiParams, ServiceDataParams } from '../../common';
import { PaymentMethodEnum } from '../../constants';
import type { DiscountTypeEnum, TransactionStatusEnum } from '../../constants';

const PATH = '/carnet';

export type CreateCarnetBankSlipsType = {
  Amount: number;
  DueDate: `${DateDayType}/${DateMonthType}/${DateYearType}`;
  Message: Tuple<string, 9>;
  DiscountAmount: number;
  DiscountType: DiscountTypeEnum;
  DiscountDue: `${DateDayType}/${DateMonthType}/${DateYearType}`;
};

export type PaymentObjectCreateCarnet = {
  PenaltyAmount: number;
  InterestAmount: number;
  BankSlips: CreateCarnetBankSlipsType[];
};

export type CreateCarnetData<T extends AnyObject> = RequestBodyBase<T> & {
  PaymentMethod?: typeof PaymentMethodEnum.BOLETO;
  PaymentObject: PaymentObjectCreateCarnet;
};

export type BankSlipsResponse = {
  IdTransaction: number;
  Status: TransactionStatusEnum;
  Message: string;
  Description: string;
  BankSlipNumber: string;
  DueDate: `${DateDayType}/${DateMonthType}/${DateYearType}`;
  DigitableLine: string;
  Barcode: string;
  BankSlipUrl: string;
};

export type CreateCarnetResponse = {
  CarnetUrl: string;
  Identifier: string;
};

export async function createCarnet<T extends AnyObject>({ api }: ServiceApiParams, { data }: ServiceDataParams<{ data: CreateCarnetData<T> }>) {
  return api.post<CreateCarnetData<T>, CreateCarnetResponse>(PATH, { ...data, PaymentMethod: PaymentMethodEnum.BOLETO });
}
