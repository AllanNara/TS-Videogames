import { Request as Req, Response as Res, NextFunction as Next } from "express";
import Genre from "../Repository/entity/Genre";
import CustomError from "../utils/customError";

export const allGenres = async (req: Req, res: Res, next: Next): Promise<any> => {
	try {
		const response = await Genre.find();
		if (!response.length) {
			throw new CustomError(
				"Base de datos no cargada",
				500,
				"No se encontraron generos en la base de datos, posible error de carga previa"
			);
		}
		res.status(200).json(response);
	} catch (error) {
		next(error);
	}
};
