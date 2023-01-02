// https://developers.safe2pay.com.br/references/Pix/payment_cancel_pix

import { joinPath, objectToPath } from '../../../../common.ts';
import type { ServiceApiParams, ServiceDataParams } from '../../../common.ts';
const PATH = '/Pix/Cancel';

export type CancelPixParams = {
  id: NumericalString;
};

export type CancelPixResponse = true;

export async function cancelPix({ payment }: ServiceApiParams, { pathParams }: ServiceDataParams<{ pathParams: CancelPixParams }>) {
  return payment.delete<CancelPixResponse>(joinPath(PATH, objectToPath(pathParams)));
}
