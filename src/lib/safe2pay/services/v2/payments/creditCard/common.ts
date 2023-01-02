import type { TransactionStatusEnum } from '../../../constants';

export type BaseCreditCardResponse = {
  IdTransaction: number;
  Token: string;
  Description: string;
  Status: TransactionStatusEnum;
  Message: string;
  CreditCard: {
    CardNumber: NumericalString;
    Brand: number;
    Installments: number;
    ReturnCode: number;
  };
};
