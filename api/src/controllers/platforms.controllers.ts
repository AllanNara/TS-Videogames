import { Request as Req, Response as Res, NextFunction as Next } from "express";
import Platform from "../Repository/entity/Platform";
import CustomError from "../utils/customError";

export const allPlatforms = async (req: Req, res: Res, next: Next): Promise<any> => {
	try {
		const response = await Platform.find();
		if (!response.length) {
			throw new CustomError(
				"Database not loaded with platforms.",
				500,
				"No platforms found in the database, possible preload error"
			);
		}
		res.status(200).json(response);
	} catch (error) {
		next(error);
	}
};
