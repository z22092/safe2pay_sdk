// https://developers.safe2pay.com.br/references/Payment/payment_cancel

import { joinPath, objectToPath } from '../../../../common.ts';
import type { ServiceApiParams, ServiceDataParams } from '../../../common.ts';

const PATH = '/CreditCard/Cancel';
const _PATH_MAP = ['id', 'amount'];

export type CancelCreditCardPathParams = {
  id: NumericalString;
  amount: NumericalString;
};

export type CancelCreditCardResponse = true;

export async function cancelCreditCard({ payment }: ServiceApiParams, { pathParams }: ServiceDataParams<{ pathParams: CancelCreditCardPathParams }>) {
  return payment.delete<CancelCreditCardResponse>(joinPath(PATH, objectToPath(pathParams, _PATH_MAP)));
}
