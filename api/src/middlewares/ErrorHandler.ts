import { Request, Response, NextFunction } from "express";
import { ICustomError } from "../interfaces/customError";
import CustomError from "../utils/customError";

export const errorHandler = (
	err: ICustomError,
	req: Request,
	res: Response,
	next: NextFunction
) => {
	console.error(err);
	if (err instanceof CustomError) {
		res.status(err.status_error).json(err);
	} else {
		res.status(500).json({
			success: false,
			status_error: 500,
			message: err.message ? err.message : "",
			error: "INTERNAL_SERVER_ERROR",
		});
	}
};
