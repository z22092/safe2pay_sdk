export const DEFAULT_URL = 'http://localhost';
export const CONTENT_TYPE = 'Content-Type';

export const MimeTypeEnum = {
  APPLICATION_JSON: 'application/json',
  FORM_URLENCODED: 'application/x-www-form-urlencoded',
  FORM_DATA: 'multipart/form-data'
} as const;

export type MimeTypeEnum = ValuesMap<typeof MimeTypeEnum>;

export const HttpMethodEnum = {
  GET: 'GET',
  DELETE: 'DELETE',
  PUT: 'PUT',
  POST: 'POST',
  PATCH: 'PATCH'
} as const;

export type HttpMethodEnum = CaseInsensitiveString<ValuesMap<typeof HttpMethodEnum>>;

export const ResponseEnum = {
  ARRAYBUFFER: 'arraybuffer',
  JSON: 'json',
  TEXT: 'text',
  FORMDATA: 'formData',
  Blob: 'blob',
  STREAM: 'stream'
} as const;

export type ResponseEnum = CaseInsensitiveString<ValuesMap<typeof ResponseEnum>>;
