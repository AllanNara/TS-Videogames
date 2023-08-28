import { Request, Response, NextFunction } from "express";
import GenreService from "../services/genre.service";

export default class GenreController {
	private genreService: GenreService;
	constructor(genreService: GenreService) {
		this.genreService = genreService;
	}

	public async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
		try {
			const genres = await this.genreService.find();
			res.send({ status: "success", result: genres });
		} catch (error) {
			next(error);
		}
	}
}
