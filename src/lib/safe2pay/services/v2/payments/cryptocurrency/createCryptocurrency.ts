// https://developers.safe2pay.com.br/references/Payment/payment_cryptocurrency

import type { RequestBodyBase, ServiceApiParams, ServiceDataParams } from '../../../common';
import { PaymentMethodEnum } from '../../../constants';
import type { CryptocurrencyTypeEnum } from '../../../constants';
import type { CryptocurrencyResponseBase } from './common';

const PATH = '/Payment';

export type PaymentObjectCryptocurrency = {
  Symbol: CryptocurrencyTypeEnum;
};

export type CreateCryptocurrencyData<T extends AnyObject> = RequestBodyBase<T> & {
  PaymentMethod?: typeof PaymentMethodEnum.CRYPTOCURRENCY;
  PaymentObject: PaymentObjectCryptocurrency;
};

export type CreateCryptocurrencyResponseBTC = CryptocurrencyResponseBase & {
  Symbol: typeof CryptocurrencyTypeEnum.BITCOIN;
  AmountBTC: number;
};

export type CreateCryptocurrencyResponseBCH = CryptocurrencyResponseBase & {
  Symbol: typeof CryptocurrencyTypeEnum.BITCOIN_CASH;
  AmountBCH: number;
};

export type CreateCryptocurrencyResponseLTC = CryptocurrencyResponseBase & {
  Symbol: typeof CryptocurrencyTypeEnum.LITECOIN;
  AmountLTC: number;
};

export type CreateCryptocurrencyResponse = CreateCryptocurrencyResponseBTC | CreateCryptocurrencyResponseBCH | CreateCryptocurrencyResponseLTC;

export async function createCryptocurrency<T extends AnyObject>({ payment }: ServiceApiParams, { data }: ServiceDataParams<{ data: CreateCryptocurrencyData<T> }>) {
  return payment.post<CreateCryptocurrencyData<T>, CreateCryptocurrencyResponse>(PATH, { ...data, PaymentMethod: PaymentMethodEnum.CRYPTOCURRENCY });
}
