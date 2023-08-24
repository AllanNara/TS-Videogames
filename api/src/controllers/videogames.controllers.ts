import { Request, Response, NextFunction } from "express";
import VideogameService from "../services/videogame.service";

export default class VideogameController {
	constructor(private videogameService: VideogameService) {}
	public async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
		try {
			const { name } = req.body;
			const videogames = await this.videogameService.find(name);
			res.send({ status: "success", result: videogames });
		} catch (error) {
			next(error);
		}
	}

	public async getById(req: Request, res: Response, next: NextFunction): Promise<void> {
		try {
			const { id } = req.params;
			const videogame = await this.videogameService.findById(id);
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

			const createdGame = await this.videogameService.create(newGame, platforms, genres);
			res.send({ status: "success", result: createdGame });
		} catch (error) {
			next(error);
		}
	}

	public async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
		try {
			const { id } = req.params;
			const deletedGame = await this.videogameService.delete(id);
			res.send({ status: "success", result: deletedGame });
		} catch (error) {
			next(error);
		}
	}
}
