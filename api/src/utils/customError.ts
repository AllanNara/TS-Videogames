import { ICustomError } from "../interfaces/customError";

export default class CustomError implements ICustomError {
	constructor(
		public error: string = "INTERNAL_SERVER_ERROR",
		public status_error: number = 500,
		public message: any = "Failed operation",
		public success: boolean = false
	) {}
}
