import type { TransactionStatusEnum } from '../../../constants';

export type BaseBoletoResponse = {
  IdTransaction: number;
  Status: TransactionStatusEnum;
  Message: string;
  Description: string;
  BankSlipNumber: NumericalString;
  DueDate: `${DateDayType}/${DateMonthType}/${DateYearType}`;
  DigitableLine: NumericalString;
  Barcode: NumericalString;
  BankSlipUrl: string;
  OperationDate: `${DateDayType}/${DateMonthType}/${DateYearType}`;
  BankName: string;
  CodeBank: NumericalString;
  Wallet: string;
  WalletDescription: string;
  Agency: NumericalString;
  Account: NumericalString;
  CodeAssignor: NumericalString;
  AgencyDV: NumericalString;
  AccountDV: NumericalString;
  DocType: string;
  Accept: string;
  Currency: string;
  GuarantorName: string;
  GuarantorIdentity: NumericalString;
};
