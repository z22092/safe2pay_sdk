export const TypesEnum = {
  ARRAY: 0,
  OBJECT: 1,
  DEFAULT: 2
} as const;

function* parserObject(parameter: AnyObject, key = '') {
  for (const [currentKey, value] of Object.entries(parameter)) {
    yield* mapsObjectToBiDimensionalArray(value, `${key !== '' ? key + '[' + currentKey + ']' : currentKey}`);
  }
}

function* parserArray(parameter: Array<AnyObject | unknown>, key = '') {
  for (let i = 0; i < parameter.length; i++) {
    const value = parameter[i];
    yield* mapsObjectToBiDimensionalArray(value, `${key !== '' ? key + '[' + i + ']' : i}`);
  }
}

function getType(parameter: AnyObject | Array<AnyObject | unknown> | unknown) {
  if (Array.isArray(parameter)) {
    return TypesEnum.ARRAY;
  }
  if (typeof parameter === 'object') {
    return TypesEnum.OBJECT;
  }
  return TypesEnum.DEFAULT;
}

export function* mapsObjectToBiDimensionalArray(parameter: AnyObject | Array<AnyObject | unknown> | unknown, key = ''): Generator<[string, string]> {
  const paramterType = getType(parameter);

  if (paramterType === TypesEnum.ARRAY) {
    yield* parserArray(parameter as Array<AnyObject | unknown>, key);
  }

  if (paramterType === TypesEnum.OBJECT) {
    yield* parserObject(parameter as AnyObject, key);
  }

  if (paramterType === TypesEnum.DEFAULT) {
    yield [key, String(parameter)];
  }
}

export function isAbsoluteURL(url: string) {
  return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(url);
}

export function combineURLs(baseURL: string, relativeURL: string) {
  return relativeURL ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '') : baseURL;
}

export function safeStringify(obj: unknown) {
  return JSON.stringify(obj, (_, value) => {
    if (typeof value === 'function') {
      return value.toString();
    }
    return value;
  });
}

export function fromEntries<_T, K extends string, V>(iterable: Iterable<[K, V]>): { [P in K]: V } {
  const result: { [P in K]: V } = {} as { [P in K]: V };

  for (const [key, value] of iterable) {
    result[key] = value;
  }

  return result;
}
