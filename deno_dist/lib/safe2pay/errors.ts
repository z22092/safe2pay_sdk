export class Safe2payError extends Error {
  public readonly errorCode: NumericalString;

  constructor(message: string, errorCode: NumericalString) {
    super(message);
    this.errorCode = errorCode;
  }
}
