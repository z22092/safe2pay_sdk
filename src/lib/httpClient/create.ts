import type { OAuthConfigType } from './auth';
import { createOAuthHeadersParser } from './auth';
import type { ConfigType } from './client';
import { httpRequest } from './client';
import { HttpMethodEnum } from './constants';

export async function _request<D = unknown, R = unknown>(config: ConfigType<D>) {
  return httpRequest<D, R>(config);
}

export async function _get<R = unknown>(url?: ConfigType<_>['url'] | ConfigType<_>, params?: ConfigType<_>['params'] | ConfigType<_>, config: WithOptional<ConfigType<_>, 'baseURL'> = {}) {
  config.method = HttpMethodEnum.GET;

  if (!config.params && params) {
    config.params = params as ConfigType<_>['params'];
  }

  if (typeof url === 'string' || url instanceof URL) {
    if (config.baseURL) {
      config.url = url;
    } else {
      config.baseURL = url;
    }
  }

  return _request<undefined, R>(config as ConfigType<undefined>);
}

export async function _delete<R = unknown>(url?: ConfigType<_>['url'] | ConfigType<_>, params?: ConfigType<_>['params'] | ConfigType<_>, config: WithOptional<ConfigType<_>, 'baseURL'> = {}) {
  config.method = HttpMethodEnum.DELETE;

  if (!config.params && params) {
    config.params = params as ConfigType<_>['params'];
  }

  if (typeof url === 'string' || url instanceof URL) {
    if (config.baseURL) {
      config.baseURL = url;
    } else {
      config.url = url;
    }
  }

  return _request<undefined, R>(config as ConfigType<undefined>);
}

export async function _post<D = unknown, R = unknown>(url?: ConfigType<D>['url'] | ConfigType<D>, data?: D, config: WithOptional<ConfigType<D>, 'baseURL'> = {}) {
  config.method = HttpMethodEnum.POST;

  if (!config.data && data) {
    config.data = data;
  }

  if (typeof url === 'string' || url instanceof URL) {
    if (config.baseURL) {
      config.baseURL = url;
    } else {
      config.url = url;
    }
  }

  return _request<D, R>(config as ConfigType<D>);
}

export async function _put<D = unknown, R = unknown>(url?: ConfigType<D>['url'] | ConfigType<D>, data?: D, config: WithOptional<ConfigType<D>, 'baseURL'> = {}) {
  config.method = HttpMethodEnum.PUT;

  if (!config.data && data) {
    config.data = data as D;
  }

  if (typeof url === 'string' || url instanceof URL) {
    if (config.baseURL) {
      config.baseURL = url;
    } else {
      config.url = url;
    }
  }

  return _request<D, R>(config as ConfigType<D>);
}

export async function _patch<D = unknown, R = unknown>(url?: ConfigType<D>['url'] | ConfigType<D>, data?: D, config: WithOptional<ConfigType<D>, 'baseURL'> = {}) {
  config.method = HttpMethodEnum.PATCH;

  if (!config.data && data) {
    config.data = data;
  }

  if (typeof url === 'string' || url instanceof URL) {
    if (config.baseURL) {
      config.baseURL = url;
    } else {
      config.url = url;
    }
  }

  return _request<D, R>(config as ConfigType<D>);
}

export function createApi(baseURL: ConfigType<_>['url'] | ConfigType<_>, config: ConfigType<_> = {}, oAuth1?: OAuthConfigType) {
  const defaultConfig = (typeof baseURL === 'object' ? baseURL : { ...config, baseURL }) as Without<ConfigType<_>, 'data'>;

  if (oAuth1) {
    defaultConfig.oAuth = createOAuthHeadersParser(oAuth1);
  }

  return {
    request: <D = unknown, R = unknown>(config: ConfigType<D> = {}) => {
      return _request<D, R>({
        ...defaultConfig,
        ...config
      });
    },
    get: <R = unknown>(url: ConfigType<_>['url'], params?: ConfigType<_>['params'], config?: ConfigType<_>) => _get<R>(url, params, { ...defaultConfig, ...config }),

    delete: <R = unknown>(url: ConfigType<_>['url'], params?: ConfigType<_>['params'], config?: ConfigType<_>) => _delete<R>(url, params, { ...defaultConfig, ...config }),

    post: async function post<D = unknown, R = unknown>(url: ConfigType<_>['url'], data?: D, config?: ConfigType<D>) {
      return _post<D, R>(url, data, {
        ...defaultConfig,
        ...config
      });
    },

    put: async function put<D = unknown, R = unknown>(url: ConfigType<D>['url'], data?: D, config?: ConfigType<D>) {
      return _put<D, R>(url, data, { ...defaultConfig, ...config });
    },

    patch: async function patch<D = unknown, R = unknown>(url: ConfigType<D>['url'], data?: D, config?: ConfigType<D>) {
      return _patch<D, R>(url, data, {
        ...defaultConfig,
        ...config
      });
    },
    defaultConfig: Object.freeze(defaultConfig)
  };
}

export type ApiInstance = ReturnType<typeof createApi>;
