import { mapsObjectToBiDimensionalArray, safeStringify } from '../common.ts';
import { MimeTypeEnum } from '../constants.ts';

export type FormObject = {
  key: string;
  value: string | Blob;
  filename?: string;
};

export const parserFormUrlencoded = function (data: AnyObject) {
  const searchParams = new URLSearchParams();
  for (const [key, parameter] of mapsObjectToBiDimensionalArray(data)) {
    searchParams.set(key, parameter);
  }

  return searchParams;
};

export const parserFormData = (data: FormObject[]) => {
  const form = new FormData();
  for (const { key, value, filename } of data as FormObject[]) {
    form.append(key, value, filename);
  }
  return form;
};

export const parserJsonData = (data: AnyObject) => {
  return safeStringify(data);
};

export const parserData = (
  mimetype: string,
  data: unknown,
): URLSearchParams | string | FormData => {
  mimetype = mimetype.toLowerCase() as MimeTypeEnum;

  if (MimeTypeEnum.APPLICATION_JSON === mimetype) {
    return parserJsonData(data as AnyObject);
  }

  if (MimeTypeEnum.FORM_URLENCODED === mimetype) {
    return parserFormUrlencoded(data as AnyObject);
  }

  if (MimeTypeEnum.FORM_DATA === mimetype) {
    return parserFormData(data as FormObject[]);
  }

  return String(data);
};
