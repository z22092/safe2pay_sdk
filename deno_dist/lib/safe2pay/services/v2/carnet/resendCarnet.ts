// https://developers.safe2pay.com.br/references/Carnet/carnet_resend

import type { ServiceApiParams, ServiceDataParams } from '../../common.ts';
const PATH = '/Carnet/Resend';

export type ResendCarnetParams = {
  identifier: string;
};

export type ResendCarnetResponse = true;

export async function resendCarnet(
  { api }: ServiceApiParams,
  { params }: ServiceDataParams<{ params: ResendCarnetParams }>,
) {
  return api.get<ResendCarnetResponse>(PATH, params);
}
