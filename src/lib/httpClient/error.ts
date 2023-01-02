import { PromiseError } from '../promiseHelpers';
const INTERNAL_SERVER_ERROR_STATUS_CODE = 500;
const INTERNAL_SERVER_ERROR_STATUS_TEXT = 'INTERNAL_SERVER_ERROR';

type HTTPResponseErrorOptionsType<D> = {
  status?: number;
  statusText?: string;
  message?: string;
  data?: D;
  stack?: string;
  showData?: boolean;
  retryable?: boolean;
  cause?: unknown;
};

export class HTTPResponseError<D = Response> extends PromiseError<D> {
  name = 'HTTPResponseError';
  status: HTTPResponseErrorOptionsType<D>['status'];
  statusText: HTTPResponseErrorOptionsType<D>['statusText'];
  isInternallError: boolean;

  readonly #showData: boolean;

  #JSON:
    | (Exclude<HTTPResponseErrorOptionsType<D>, 'stack'> & {
        name: HTTPResponseError['name'];
      })
    | null = null;

  constructor({
    status = INTERNAL_SERVER_ERROR_STATUS_CODE,
    statusText = INTERNAL_SERVER_ERROR_STATUS_TEXT,
    message,
    data,
    stack,
    retryable,
    showData = false,
    cause
  }: HTTPResponseErrorOptionsType<D>) {
    const isInternallError = status >= INTERNAL_SERVER_ERROR_STATUS_CODE;

    super({
      message: message ?? `HTTP Error Response: ${status} ${statusText}`,
      retryable: retryable ?? !isInternallError,
      data
    });

    this.stack = stack;
    this.#showData = showData ?? !isInternallError;
    this.status = status;
    this.statusText = statusText;
    this.isInternallError = isInternallError;
    this.cause = cause;
  }

  get data() {
    if (this.#showData) {
      return super.data;
    }
  }

  toJSON() {
    if (!this.#JSON) {
      this.#JSON = {
        name: this.name,
        message: this.message,
        status: this.status,
        statusText: this.statusText,
        retryable: this.retryable,
        data: this.data,
        cause: this.cause
      };
    }

    return this.#JSON;
  }
}

export function toHttpError(error: AnyObject) {
  if (error instanceof HTTPResponseError) {
    return error;
  }

  return new HTTPResponseError({
    status: error?.status as HTTPResponseErrorOptionsType<Error>['status'],
    statusText: error?.statusText as HTTPResponseErrorOptionsType<Error>['statusText'],
    message: error?.message as HTTPResponseErrorOptionsType<Error>['message'],
    data: error?.data as HTTPResponseErrorOptionsType<Error>['data'],
    stack: error?.stack as HTTPResponseErrorOptionsType<Error>['stack'],
    retryable: error?.retryable as HTTPResponseErrorOptionsType<Error>['retryable'],
    showData: error?.showData as HTTPResponseErrorOptionsType<Error>['showData']
  });
}
