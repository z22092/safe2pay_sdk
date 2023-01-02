// https://developers.safe2pay.com.br/references/Pix/payment_dynamic_pix

import type { RequestBodyBase, ServiceApiParams, ServiceDataParams } from '../../../common.ts';
import { PaymentMethodEnum } from '../../../constants.ts';
import type { TransactionStatusEnum } from '../../../constants.ts';
const PATH = '/Payment';

export type PaymentObjectDynamicPix = {
  Expiration: Seconds; // default 86400 # 24h
};

export type DynamicPixData<T extends AnyObject> = RequestBodyBase<T> & {
  PaymentMethod?: typeof PaymentMethodEnum.PIX;
  PaymentObject: PaymentObjectDynamicPix;
};

export type DynamicPixResponse = {
  IdTransaction: NumericalString;
  Status: TransactionStatusEnum;
  Message: string;
  Description: string;
  QrCode: string;
  Key: string;
};

export async function createDynamicPix<T extends AnyObject>({ payment }: ServiceApiParams, { data }: ServiceDataParams<{ data: DynamicPixData<T> }>) {
  return payment.post<DynamicPixData<T>, DynamicPixResponse>(PATH, { ...data, PaymentMethod: PaymentMethodEnum.PIX });
}
