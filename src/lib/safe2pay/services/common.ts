import type { Safe2PayApi, Safe2PayPayment } from '../client';
import type { PaymentMethodEnum, CodeTaxTypeEnum, CodeReceiverTypeEnum } from './constants';

export type ServiceApiParams = {
  api: Safe2PayApi;
  payment: Safe2PayPayment;
};

export type _ServiceDataParams = {
  params?: unknown;
  data?: unknown;
  pathParams?: unknown;
};

export type ServiceDataParams<T extends _ServiceDataParams> = {
  [Property in keyof T]: T[Property];
};

export type AddressType = {
  ZipCode?: NumericalString;
  Street?: string;
  Number?: NumericalString;
  Complement?: string;
  District?: string;
  CityName?: string;
  StateInitials?: string;
  CountryName?: string;
};

export type CustomerType = {
  Name?: string;
  Identity: NumericalString;
  Phone?: NumericalString;
  Email?: string;
  Address?: AddressType;
};

export type ProductType = {
  Code: NumericalString;
  Description: string;
  UnitPrice: number;
  Quantity: number;
};

export type Products = ProductType[];

export type SplitType = {
  CodeTaxType: CodeTaxTypeEnum;
  CodeReceiverType: CodeReceiverTypeEnum;
  IdReceiver: number;
  Identity: NumericalString;
  Name: string;
  IsPayTax: boolean;
  Amount: number;
};

export type SplitsType = SplitType[];

export type RequestBodyBase<T extends AnyObject> = {
  IsSandbox: boolean;
  IpAddress?: string;
  Application?: string;
  Vendor?: string;
  CallbackUrl: string;
  Reference: string;
  PaymentMethod?: PaymentMethodEnum;
  Meta?: T;
  PaymentObject: unknown;
  Customer: CustomerType;
  Products: Products;
  Splits: SplitsType;
};
