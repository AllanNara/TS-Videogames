import { Request, Response, NextFunction } from "express";
import CustomError from "../utils/customError";
export const checkBodyFields = async (
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> => {
	const { name, platforms, genres, description } = req.body;
	if (!name || !platforms || !genres || !description) {
		throw new CustomError("missing fields", 400);
	}
	next();
};
