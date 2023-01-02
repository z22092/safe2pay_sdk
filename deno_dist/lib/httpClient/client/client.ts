import { promiseRetry, promiseTimeout } from '../../promiseHelpers/index.ts';
import { ResponseEnum } from '../constants.ts';
import { HTTPResponseError, toHttpError } from '../error.ts';
import type { ConfigType} from './configuration.ts';
import { _RequestConfig } from './configuration.ts';

export const checkStatus = (response: Response) => {
  if (response.ok) {
    return response;
  } else {
    throw new HTTPResponseError<Response>({
      status: response.status,
      statusText: response.statusText,
      data: response
    });
  }
};

export const parserResponse = <R = unknown>(
  response: Response,
  responseType: ResponseEnum,
): Promise<R | ArrayBuffer | string | FormData | Blob> | ReadableStream<Uint8Array> | null => {
  const responseParser = responseType.toLowerCase();

  if (responseParser === ResponseEnum.ARRAYBUFFER) {
    return response.arrayBuffer();
  }

  if (responseParser === ResponseEnum.JSON) {
    return response.json();
  }

  if (responseParser === ResponseEnum.TEXT) {
    return response.text();
  }

  if (responseParser === ResponseEnum.FORMDATA) {
    return response.formData();
  }

  if (responseParser === ResponseEnum.Blob) {
    return response.blob();
  }

  return response.body;
};

async function _request<D, R>(config: _RequestConfig<D>) {
  const _fetch = config.fetch || fetch;
  const response = await _fetch(config);

  checkStatus(response);

  if (config.parser) {
    return config.parser(response) as R;
  }

  return parserResponse<R>(response, config.responseType as ResponseEnum) as R;
}

async function _fetchProxy<D, R>(config: _RequestConfig<D>): Promise<R> {
  try {
    let _fetch = _request;

    if (config.timeout) {
      _fetch = promiseTimeout(_fetch, {
        milliseconds: config.timeout
      });
    }

    if (config.retry) {
      _fetch = promiseRetry(_fetch, config.retry);
    }

    return await _fetch<D, R>(config);
  } catch (err) {
    throw toHttpError(err as AnyObject);
  }
}

export async function httpRequest<D, R>(config: ConfigType<D>) {
  return _fetchProxy<D, R>(new _RequestConfig<D>(config));
}
