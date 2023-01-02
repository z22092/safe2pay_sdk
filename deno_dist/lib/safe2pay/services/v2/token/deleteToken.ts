// https://developers.safe2pay.com.br/references/Tokenization/tokenization_delete

import type { ServiceDataParams, ServiceApiParams } from '../../common.ts';
const PATH = '/token/delete';

export type DeleteTokenParams = {
  cardToken: string;
};

export type deleteTokenResponse = true;

export async function deleteToken(
  { payment }: ServiceApiParams,
  { params }: ServiceDataParams<{ params: DeleteTokenParams }>,
) {
  return payment.get<deleteTokenResponse>(PATH, params);
}
