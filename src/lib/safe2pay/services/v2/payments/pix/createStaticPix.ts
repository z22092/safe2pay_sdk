// https://developers.safe2pay.com.br/references/Pix/payment_static_pix

import type { ServiceApiParams, ServiceDataParams } from '../../../common';
const PATH = '/StaticPix';

export type StaticPixData = {
  Amount: number;
  Description: string;
  Reference: string;
  CallbackUrl: string;
};

export type StaticPixResponse = {
  Id: number;
  Identifier: string;
  QrCode: string;
  Key: string;
};

export async function createStaticPix(
  { payment }: ServiceApiParams,
  { data }: ServiceDataParams<{ data: StaticPixData }>,
) {
  return payment.post<StaticPixData, StaticPixResponse>(PATH, data);
}
