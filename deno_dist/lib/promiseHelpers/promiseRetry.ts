import { delayAsync } from './common.ts';
import type { PromiseError} from './error.ts';
import { PromiseMaximunAttemptsError } from './error.ts';

export type PromiseRetryOptions = { attempts: number; delayTime?: Milliseconds }

export function promiseRetry<T extends AsyncFunction<T>>(
  fn: T,
  { attempts, delayTime }: PromiseRetryOptions,
) {
  const proxyFunction = {
    async [fn.name](...params: Parameters<T>): Promise<Awaited<ReturnType<T>>> {
      const errors: Set<PromiseError> = new Set();
      let tried = 1;

      const errorHandler = async (error: PromiseError) => {
        errors.add(error);
        if (error.retryable !== false) {
          if (delayTime) {
            await delayAsync(delayTime);
          }
          tried++;
          return fn(...params);
        }
        throw errors;
      };

      const errorHandlerFinal = (error: PromiseError) => {
        errors.add(error);
        throw new PromiseMaximunAttemptsError(
          tried,
          attempts,
          delayTime,
          fn.name,
          [...errors.values()],
        );
      };

      let promise = fn.apply(fn, params);

      for (let i = 0; i < attempts; i++) {
        if (i === attempts - 1) {
          promise = promise.catch(errorHandlerFinal);
          continue;
        }
        promise = promise.catch(errorHandler) as Awaited<ReturnType<T>>;
      }

      return promise;
    }
  };

  return proxyFunction[fn.name].bind(fn) as T;
}
