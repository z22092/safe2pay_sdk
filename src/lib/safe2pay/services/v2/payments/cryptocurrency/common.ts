import type { TransactionStatusEnum } from '../../../constants';

export type CryptocurrencyResponseBase = {
  IdTransaction: string;
  Status: TransactionStatusEnum;
  Message: string;
  Description: string;
  QrCode: string;
  WalletAddress: string;
};
