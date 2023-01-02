const BASIC = 'Basic';
const BASE64 = 'base64';

export type BasicCredentialsType = {
  username: string
  password: string
}

export function basicAuthHeader(
  username: BasicCredentialsType['username'],
  password: BasicCredentialsType['password'],
) {
  return `${BASIC} ${Buffer.from(`${username}:${password}`).toString(BASE64)}`;
}
