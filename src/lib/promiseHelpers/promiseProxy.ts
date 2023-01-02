export type HandlerParamsType<T extends AsyncFunction<T>> = (..._: Parameters<T>) => Promise<Parameters<T>>;

export type HandlerReturnType<T extends AsyncFunction<T>> = (_: Promise<ReturnType<T>>) => Promise<ReturnType<T>>;

export type PromiseProxyOptions<T extends AsyncFunction<T>> = {
  handlerParams?: HandlerParamsType<T>;
  handlerReturn?: HandlerReturnType<T>;
};

export function promiseProxy<T extends AsyncFunction<T>>(fn: T, { handlerParams, handlerReturn }: PromiseProxyOptions<T> = {}) {
  async function proxy(...params: Parameters<T>): Promise<ReturnType<T>> {
    if (handlerParams) {
      params = await handlerParams(...params);
    }

    const response = await fn(...params);

    if (handlerReturn) {
      return handlerReturn(response);
    }
    return response;
  }

  return proxy as T;
}
