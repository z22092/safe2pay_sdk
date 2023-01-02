import { delayAsync } from './common.ts';
import type { PromiseError} from './error.ts';
import { PromiseTimeoutError } from './error.ts';

export type PromiseTimeoutOptions = {
  milliseconds: Milliseconds
  errorMessage?: Error | PromiseError
}

export function promiseTimeout<T extends AsyncFunction<T>>(
  fn: T,
  { milliseconds, errorMessage }: PromiseTimeoutOptions,
) {
  const timeoutAbort = new AbortController();
  const proxyFunction = {
    async [fn.name](...args: Parameters<T>) {
      return Promise.race([
        fn.apply(fn, args).finally(() => timeoutAbort.abort()),
        delayAsync(milliseconds, { signal: timeoutAbort.signal }).then(() => {
          throw errorMessage || new PromiseTimeoutError(milliseconds, fn.name);
        })
      ]);
    }
  };

  return proxyFunction[fn.name] as T;
}
