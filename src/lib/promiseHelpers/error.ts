const PROMISE_TIMEOUT_EXCEEDED = {
  message: 'promise timeout exceeded: ',
  retryable: true
};

const MAXIMUM_ATTEMPTS_EXCEEDED = {
  message: 'maximum attempts exceeded: ',
  retryable: false
};

export type PromiseErrorParams<D = unknown> = {
  message: string;
  retryable?: boolean;
  data?: D;
};

export class PromiseError<D = unknown> extends Error implements PromiseErrorParams<D> {
  name = 'PromiseError';

  readonly retryable?: boolean;

  readonly #data?: D;

  get data() {
    return this.#data;
  }

  constructor({ message, retryable, data }: PromiseErrorParams<D>) {
    const defaultRetryable = true;
    super(message);

    this.retryable = retryable ?? defaultRetryable;
    this.#data = data;
  }
}

export class PromiseTimeoutError extends PromiseError {
  name = 'PromiseTimeoutError';

  constructor(timeout: Milliseconds, functionName: string) {
    super({
      ...PROMISE_TIMEOUT_EXCEEDED,
      message: PROMISE_TIMEOUT_EXCEEDED.message + `timeout: ${timeout} name: ${functionName}`
    });
  }
}

export class PromiseMaximunAttemptsError extends PromiseError<Array<Error>> {
  name = 'PromiseMaximunAttemptsError';

  constructor(
    tried: number,
    attempts: number,
    delayTime: Milliseconds = 0,
    functionName: string,
    errors: Array<PromiseError>,
  ) {
    super({
      ...MAXIMUM_ATTEMPTS_EXCEEDED,
      message:
        MAXIMUM_ATTEMPTS_EXCEEDED.message +
        `${tried}, attempts: ${attempts} delay: ${delayTime} name: ${functionName}`,
      data: errors
    });
  }
}
