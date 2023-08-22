import { Request as Req, Response as Res, NextFunction as Next } from "express";
import { Platform } from "../Repository/entity";
import { CustomError } from "../utils/customError";

export const allPlatforms = async (req: Req, res: Res, next: Next): Promise<any> => {
	try {
		const response = await Platform.find();
		if (!response.length) {
			throw new CustomError(
				"Base de datos no cargada",
				500,
				"No se encontraron plataformas en la base de datos, posible error de carga previa"
			);
		}
		res.status(200).json(response);
	} catch (error) {
		next(error);
	}
};
