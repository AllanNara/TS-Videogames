import { Request, Response, NextFunction } from "express";
import videogameService from "../services/videogame.service";

class VideogameController {
	public async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
		try {
			const { name } = req.body;
			const videogames = await videogameService.find(name);
			res.send({ status: "success", result: videogames });
		} catch (error) {
			next(error);
		}
	}

	public async getById(req: Request, res: Response, next: NextFunction): Promise<void> {
		try {
			const { id } = req.params;
			const videogame = await videogameService.findById(id);
			res.send({ status: "success", result: videogame });
		} catch (error) {
			next(error);
		}
	}

	public async create(req: Request, res: Response, next: NextFunction): Promise<void> {
		try {
			const { name, description, platforms, genres, rating, image, released } = req.body;

			const newGame = {
				name,
				description,
				rating,
				image,
				released,
			};

			const createdGame = await videogameService.create(newGame, platforms, genres);
			res.send({ status: "success", result: createdGame });
		} catch (error) {
			next(error);
		}
	}

	public async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
		try {
			const { id } = req.params;
			const deletedGame = await videogameService.delete(id);
			res.send({ status: "success", result: deletedGame });
		} catch (error) {
			next(error);
		}
	}
}

export default new VideogameController();
