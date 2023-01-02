// https://developers.safe2pay.com.br/references/Tokenization/tokenization_create

import type { ServiceDataParams, ServiceApiParams } from '../../common.ts';
const PATH = '/token';

export type CreateTokenData = {
  IsSandbox: boolean;
  Holder: string;
  CardNumber: string;
  ExpirationDate: `${DateMonthType}/${DateYearType}`;
  SecurityCode: NumericalString;
};

export type CreateTokenResponse = {
  Token: string;
};

export async function createToken(
  { payment }: ServiceApiParams,
  { data }: ServiceDataParams<{ data: CreateTokenData }>,
) {
  return payment.post<CreateTokenData, CreateTokenResponse>(PATH, data);
}
