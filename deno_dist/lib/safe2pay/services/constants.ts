export const CryptocurrencyTypeEnum = {
  BITCOIN: 'BTC',
  BITCOIN_CASH: 'BCH',
  LITECOIN: 'LTC'
} as const;

export type CryptocurrencyTypeEnum = ValuesMap<typeof CryptocurrencyTypeEnum>

export const TransactionStatusEnum = {
  PENDING: 1,
  PROCESSING: 2,
  APPROVED: 3,
  IN_DISPUTE: 5,
  REFUNDED: 6,
  DOWNLOADED: 7,
  REFUSED: 8,
  RELEASED: 11,
  IN_CANCELLATION: 12,
  CHARGEBACK: 13,
  PRE_AUTHORIZED: 14
} as const;

export type TransactionStatusEnum = ValuesMap<typeof TransactionStatusEnum>

export const PaymentMethodEnum = {
  BOLETO: 1,
  CREDIT_CARD: 2,
  CRYPTOCURRENCY: 3,
  DEBIT_CARD: 4,
  PIX: 6,
  DEBIT_ACCOUNT: 10
} as const;

export type PaymentMethodEnum = ValuesMap<typeof PaymentMethodEnum>

export const CodeTaxTypeEnum = {
  PERCENTAGE: 1,
  FIXED: 2
} as const;

export type CodeTaxTypeEnum = ValuesMap<typeof CodeTaxTypeEnum>

export const CodeReceiverTypeEnum = {
  COMPANY: '1',
  SUB_ACCOUNT: '2'
} as const;

export type CodeReceiverTypeEnum = ValuesMap<typeof CodeReceiverTypeEnum>

export const DiscountTypeEnum = {
  FIXED: 1,
  ANTICIPATION_CALENDAR_DAYS: 2,
  ANTICIPATION_WORKING_DAYS: 3
} as const;

export type DiscountTypeEnum = ValuesMap<typeof DiscountTypeEnum>
