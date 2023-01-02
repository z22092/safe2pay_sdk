// https://developers.safe2pay.com.br/references/Carnet/carnetlot_get

import type { ServiceApiParams, ServiceDataParams } from '../../common.ts';
const PATH = '/carnetasync/Get';

export type ConsultCarnetBatchParams = {
  identifier: string;
};

export type ConsultCarnetBatchResponse = {
  IsProcessed: boolean;
  Message: string;
  IdentifierLot: string;
};

export async function consultCarnetBatch(
  { api }: ServiceApiParams,
  { params }: ServiceDataParams<{ params: ConsultCarnetBatchParams }>,
) {
  return api.get<ConsultCarnetBatchResponse>(PATH, params);
}
