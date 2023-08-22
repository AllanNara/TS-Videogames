import { Request as Req, Response as Res, NextFunction as Next } from "express";
import { Videogame } from "../Repository/entity";
import { getGamesApi } from "../services/gamesRawgApi";
import { CustomError } from "../utils/customError";
import { VideogamesResults } from "../../types/types";
import { Like } from "typeorm";

export const allVideogames = async (req: Req, res: Res, next: Next): Promise<any> => {
	const { name } = req.query;
	try {
		if (Boolean(name) && Array.isArray(name))
			throw new CustomError("Only accept one query 'name'", 400);

		let result: Array<Videogame> | Array<VideogamesResults> = [];

		const gamesDb = await Videogame.find({
			where: name
				? {
						name: Like(`%${name}%`),
				  }
				: undefined,
			select: {
				id: true,
				rating: true,
				name: true,
				isDataBase: true,
				image: true,
			},
			relations: {
				genres: true,
				platforms: true,
			},
		});

		const gamesApi = await getGamesApi(name as string);

		result = [...gamesDb, ...gamesApi];
		if (result.length === 0) {
			return res.status(200).json({ empty: "Game not found" });
		}

		result.sort((a, b) => b.rating - a.rating);
		res.status(200).json(result);
	} catch (error) {
		next(error);
	}
};
