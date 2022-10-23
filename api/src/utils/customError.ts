import { InterfaceCustomError } from "../../types";

// Class for handle error catching
export class CustomError implements InterfaceCustomError {
  message!: string;
  status!: number;
  additionalInfo!: any;

  constructor(message: string, status: number = 500, additionalInfo: any = {}) {
    this.message = message;
    this.status = status;
    this.additionalInfo = additionalInfo;
  }
}

// export default CustomError;
