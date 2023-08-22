import { Request, Response } from "express";
import CustomError from "../utils/customError";

export const pageNotFound = (req: Request, res: Response) => {
	const page404 = req.params[0].replace("/api", "");
	const error = new CustomError(`URL_NOT_FOUND: ${page404}`, 404, "failed", false);
	res.status(404).json(error);
};
