import { join, sep } from 'https://deno.land/std@0.170.0/node/path.ts';
import { Safe2payError } from './errors.ts';

const SEP = sep;

export type ResponseSuccessType<D = unknown> = {
  ResponseDetail: D;
};

export type BaseErrorType = {
  ErrorCode: NumericalString;
  Error: string;
};

export type BaseResponse<D = unknown, T extends boolean = false> = T extends true
  ? {
      HasError: true;
      ErrorCode: NumericalString;
      Error: string;
    }
  : {
      HasError: false;
      ResponseDetail: D;
    };

export async function parserSafe2PayResponse<R extends AnyObject>(response: Response) {
  const { HasError, ResponseDetail } = (await response.json()) as BaseResponse<R>;

  if (HasError) {
    const { ErrorCode: errorCode, Error: errorMessage } = response as unknown as BaseErrorType;
    throw new Safe2payError(errorMessage, errorCode);
  }

  return ResponseDetail;
}

export const joinPath = join;

export function objectToPath(obj: AnyObject<string>, position?: Record<number, string>) {
  const path: string[] = [];

  const positionsArray = Object.values(position || Object.keys(obj));

  for (const key of positionsArray) {
    if (obj[key]) {
      path.push(obj[key]);
    }
  }

  return path.join(SEP);
}
