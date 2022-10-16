// Class for handle error catching
export class CustomError {
  message!: string;
  status!: number;
  additionalInfo!: any;

  constructor(message, status: number = 500, additionalInfo: any = {}) {
    this.message = message;
    this.status = status;
    this.additionalInfo = additionalInfo
  }

}