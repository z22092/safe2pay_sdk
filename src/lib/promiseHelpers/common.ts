export class AbortError extends Error {
  type!: string;
  name!: 'AbortError';
  [Symbol.toStringTag]!: 'AbortError';
}

export type TimerOptions = {
  signal?: AbortSignal;
};

export const delayAsync = (delayTime: Milliseconds, { signal }: TimerOptions = {}) => {
  return new Promise((resolve, reject) => {
    if (signal?.aborted) {
      return reject(signal?.reason || new Error('Aborted'));
    }

    const delay = setTimeout(resolve, delayTime);

    signal?.addEventListener('abort', () => {
      clearTimeout(delay);
      reject(signal?.reason || new AbortError('Aborted'));
    });
  });
};
