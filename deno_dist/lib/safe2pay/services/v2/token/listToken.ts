// https://developers.safe2pay.com.br/references/Tokenization/tokenization_list

import type { ServiceDataParams, ServiceApiParams } from '../../common.ts';
const PATH = '/Token/List';

export type ListTokenParams = {
  IsSandbox: boolean;
  PageNumber: number;
  RowsPerPage: number;
};

export type ListTokenObjectResponse = {
  Token: string;
  Holder: string;
  CardNumber: string;
  CreatedDate: DateType;
  CreatedDateTime: string;
  Brand: string;
};

export type ListTokenResponse = {
  TotalItems: number;
  Objects: ListTokenObjectResponse[];
};

export async function listToken(
  { payment }: ServiceApiParams,
  { params }: ServiceDataParams<{ params: ListTokenParams }>,
) {
  return payment.get<ListTokenResponse>(PATH, params);
}
