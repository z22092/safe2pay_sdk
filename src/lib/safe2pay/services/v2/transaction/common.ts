import type { CustomerType, ProductType } from '../../common';
import type { PaymentMethodEnum, TransactionStatusEnum } from '../../constants';
import type { BaseBoletoResponse } from '../payments/boleto';
import type { BaseCreditCardResponse } from '../payments/creditCard';
import type { CreateCryptocurrencyResponse } from '../payments/cryptocurrency';

type TransactionsPaymentObjectBoleto = {
  BankSlipNumber?: BaseBoletoResponse['BankSlipNumber'];
  DueDate?: BaseBoletoResponse['DueDate'];
  DigitableLine?: BaseBoletoResponse['DigitableLine'];
  Barcode?: BaseBoletoResponse['Barcode'];
  BankSlipUrl?: BaseBoletoResponse['BankSlipUrl'];
};

type TransactionsPaymentObjectPix = {
  QrCode: string;
  Key: string;
};

export type TransactionsPaymentObject<T> =
  | (T & (TransactionsPaymentObjectBoleto | TransactionsPaymentObjectPix))
  | {
      Message: string;
      Token?: BaseCreditCardResponse['Token'];
      CardNumber?: BaseCreditCardResponse['CreditCard']['CardNumber'];
      ReturnCode?: BaseCreditCardResponse['CreditCard']['ReturnCode'];
      Installments?: BaseCreditCardResponse['CreditCard']['Installments'];
      Brand?: BaseCreditCardResponse['CreditCard']['Brand'];
      QrCode?: CreateCryptocurrencyResponse['QrCode'];
      WalletAddress?: CreateCryptocurrencyResponse['WalletAddress'];
      AmountBTC?: number;
      AmountBCH?: number;
      AmountLTC?: number;
    };

export type TransactionsObjectResponse<M extends AnyObject, T extends AnyObject> = {
  IdTransaction: number;
  Status: TransactionStatusEnum;
  Message: string;
  Application: string;
  Description: string;
  Vendor: string;
  Reference: string;
  PaymentDate: DateType;
  PaymentDateTime: string;
  CallbackUrl: string;
  Meta: M;
  CreatedDate: DateType;
  CreatedDateTime: string;
  Amount: number;
  NetValue: number;
  DiscountAmount: number;
  TaxValue: number;
  PaymentMethod: PaymentMethodEnum;
  AmountPayment: number;
  Customer: CustomerType;
  Products: ProductType;
  PaymentObject: TransactionsPaymentObject<T>;
};
