// https://developers.safe2pay.com.br/references/Payment/payment_credit

import type { ServiceApiParams, RequestBodyBase, ServiceDataParams } from '../../../common';
import { PaymentMethodEnum } from '../../../constants';
import type { BaseCreditCardResponse } from './common';

const PATH = '/Payment';

export type PaymentObjectCreateCreditCard = {
  InstallmentQuantity: number;
  IsPreAuthorization: boolean;
  IsApplyInterest: boolean;
  InterestRate: number;
  SoftDescriptor: string;
  Holder: string;
  CardNumber: NumericalString;
  ExpirationDate: `${DateMonthType}/${DateYearType}`;
  SecurityCode: NumericalString;
  Token: string;
};

export type PaymentObjectCreateCreditCardWithToken = Omit<PaymentObjectCreateCreditCard, 'Holder' | 'CardNumber' | 'ExpirationDate' | 'SecurityCode'>;
export type PaymentObjectCreateCreditCardWithoutToken = Omit<PaymentObjectCreateCreditCard, 'Token'>;

export type CreateCreditCardData<T extends AnyObject> = RequestBodyBase<T> & {
  ShouldUseAntiFraud: boolean;
  VisitorID: string;
  PaymentMethod?: typeof PaymentMethodEnum.CREDIT_CARD;
  PaymentObject: PaymentObjectCreateCreditCardWithToken | PaymentObjectCreateCreditCardWithoutToken;
};

export type CreateCreditCardResponse = BaseCreditCardResponse;

export async function createCreditCard<T extends AnyObject>({ payment }: ServiceApiParams, { data }: ServiceDataParams<{ data: CreateCreditCardData<T> }>) {
  return payment.post<CreateCreditCardData<T>, CreateCreditCardResponse>(PATH, { ...data, PaymentMethod: PaymentMethodEnum.CREDIT_CARD });
}
