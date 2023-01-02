import type { TransactionStatusEnum } from '../../../constants.ts';

export type CryptocurrencyResponseBase = {
  IdTransaction: string;
  Status: TransactionStatusEnum;
  Message: string;
  Description: string;
  QrCode: string;
  WalletAddress: string;
};
