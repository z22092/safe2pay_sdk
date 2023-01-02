import type { BasicCredentialsType, OAuthHeadersParserType } from '../auth/index.ts';
import { basicAuthHeader } from '../auth/index.ts';

import { combineURLs, fromEntries, isAbsoluteURL } from '../common.ts';
import { DEFAULT_URL, CONTENT_TYPE, HttpMethodEnum, ResponseEnum, MimeTypeEnum } from '../constants.ts';
import { parserData } from './dataParser.ts';

export const QueryParamsTypeEnum = {
  ARRAY: 0,
  OBJECT: 1,
  DEFAULT: 2
} as const;

export type UrlType = string | URL;

export type ParamsType = string | Record<string, unknown> | URLSearchParams;

export type ResponseType = ResponseEnum;

export type ParserResponseType = <R = unknown, P = unknown>(_: P) => R;

export type RetryOptionsType = {
  attempts: number;
  delayTime?: Milliseconds;
};

export type HeadersType = [string, string][] | Record<string, string> | Headers;

export type ConfigType<D = unknown> = {
  method?: HttpMethodEnum;
  url?: UrlType;
  baseURL?: UrlType;
  data?: D;
  signal?: AbortSignal;
  headers?: HeadersType;
  params?: ParamsType;
  timeout?: Milliseconds;
  retry?: RetryOptionsType;
  auth?: BasicCredentialsType;
  oAuth?: OAuthHeadersParserType;
  responseType?: ResponseType;
  fetch?: typeof fetch;
  parser?: (_: Response) => unknown;
};

function* parserObjectSetFlattenedQueryParams(parameter: AnyObject, key = '') {
  const entries = Object.entries(parameter);
  for (const data of entries) {
    const [currentKey, value] = data;

    yield* flattenedQueryParamsGenerator(value, `${key}${key !== '' ? '.' : ''}${currentKey}`);
  }
}

function* parserArraySetFlattenedQueryParams(parameter: Array<AnyObject | unknown>, key = '') {
  for (const item of parameter) {
    yield* flattenedQueryParamsGenerator(item, key);
  }
}

function getQueryParamsType(parameter: AnyObject | Array<AnyObject | unknown> | unknown) {
  if (Array.isArray(parameter)) {
    return QueryParamsTypeEnum.ARRAY;
  }
  if (typeof parameter === 'object') {
    return QueryParamsTypeEnum.OBJECT;
  }
  return QueryParamsTypeEnum.DEFAULT;
}

function* flattenedQueryParamsGenerator(parameter: AnyObject | Array<AnyObject | unknown> | unknown, key = ''): Generator<[string, string]> {
  switch (getQueryParamsType(parameter)) {
    case QueryParamsTypeEnum.ARRAY: {
      yield* parserArraySetFlattenedQueryParams(parameter as Array<AnyObject | unknown>, key);
      break;
    }
    case QueryParamsTypeEnum.OBJECT: {
      yield* parserObjectSetFlattenedQueryParams(parameter as AnyObject, key);
      break;
    }
    default: {
      yield [key, String(parameter)];
    }
  }
}

export function isURLSearchParams(str: string): boolean {
  try {
    new URLSearchParams(str);
    return true;
  } catch (e) {
    return false;
  }
}

function mergeUrlSerchParams(...serchParams: URLSearchParams[]) {
  const params = {};
  for (const serchParam of serchParams) {
    Object.assign(params, fromEntries(serchParam));
  }
  return new URLSearchParams(params);
}

export const parserQueryParams = function (url: URL, params: ParamsType) {
  if (typeof params === 'string' && isURLSearchParams(params)) {
    return mergeUrlSerchParams(url.searchParams, new URLSearchParams(params)).toString();
  }

  if (params instanceof URLSearchParams) {
    return mergeUrlSerchParams(url.searchParams, params).toString();
  }

  const searchParams = new URLSearchParams(url.search);

  for (const data of flattenedQueryParamsGenerator(params)) {
    const [key, parameter] = data;
    if (searchParams.has(key)) {
      searchParams.append(key, parameter);
    } else {
      searchParams.set(key, parameter);
    }
  }

  return searchParams.toString();
};

export class RequestConfig<D = unknown> implements ConfigType<D> {
  method: ConfigType<D>['method'];
  url?: ConfigType<D>['url'];
  baseURL?: ConfigType<D>['baseURL'];
  data?: D;
  signal: ConfigType<D>['signal'] = new AbortController().signal;
  headers: ConfigType<D>['headers'] = new Headers();
  params?: ConfigType<D>['params'];
  timeout?: ConfigType<D>['timeout'];
  retry?: ConfigType<D>['retry'];
  auth?: ConfigType<D>['auth'];
  responseType: ConfigType<D>['responseType'];
  fetch?: ConfigType<D>['fetch'];
  parser?: ConfigType<D>['parser'];

  constructor(config: WithOptional<ConfigType<D>, 'baseURL'> = {}) {
    Object.assign(this, config);
  }
}

export class _RequestConfig<D> extends Request {
  responseType: ConfigType<D>['responseType'] = ResponseEnum.JSON;
  timeout?: ConfigType<D>['timeout'];
  retry?: ConfigType<D>['retry'];
  fetch?: ConfigType<D>['fetch'];
  parser?: ConfigType<D>['parser'];

  constructor(config: ConfigType<D>) {
    const { method, url = '', baseURL = DEFAULT_URL, data, signal, headers, params = {}, timeout, retry, auth, oAuth, responseType = ResponseEnum.JSON, fetch, parser } = config;

    const fetchURL = new URL(!baseURL || isAbsoluteURL(config.url?.toString() || '') ? url : combineURLs(baseURL.toString(), url.toString()));

    const fetchParams = parserQueryParams(fetchURL, params);

    const fetchHeaders = new Headers(headers);

    if (!fetchHeaders.has(CONTENT_TYPE) && data) {
      fetchHeaders.set(CONTENT_TYPE, MimeTypeEnum.APPLICATION_JSON);
    }

    if (auth) {
      const { username, password } = auth;
      fetchHeaders.set('Authorization', basicAuthHeader(username, password));
    }

    fetchURL.search = fetchParams;
    const fetchMethod = method || HttpMethodEnum.GET;

    const fetchData = data ? parserData(fetchHeaders.get(CONTENT_TYPE) as string, data) : undefined;

    super(fetchURL, {
      method: fetchMethod,
      headers: oAuth
        ? oAuth({
          method: fetchMethod,
          data: fetchData as string | URLSearchParams | FormData,
          url: fetchURL,
          headers: fetchHeaders
        })
        : fetchHeaders,
      body: fetchData,
      signal
    });

    this.timeout = timeout;
    this.responseType = responseType;
    this.retry = retry;
    this.fetch = fetch;
    this.parser = parser;
  }
}
