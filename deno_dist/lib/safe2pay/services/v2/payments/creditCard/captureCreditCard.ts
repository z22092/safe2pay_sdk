// https://developers.safe2pay.com.br/references/Payment/payment_capture

import { joinPath, objectToPath } from '../../../../common.ts';
import type { ServiceApiParams, ServiceDataParams } from '../../../common.ts';
import type { BaseCreditCardResponse } from './common.ts';

const PATH = '/CreditCard/Capture';
const _PATH_MAP = ['id', 'amount'];

export type CaptureCreditCardPathParams = {
  id: NumericalString;
  amount: NumericalString;
};

export type CaptureCreditCardResponse = BaseCreditCardResponse;

export async function captureCreditCard({ payment }: ServiceApiParams, { pathParams }: ServiceDataParams<{ pathParams: CaptureCreditCardPathParams }>) {
  return payment.put<undefined, CaptureCreditCardResponse>(joinPath(PATH, objectToPath(pathParams, _PATH_MAP)));
}
