import { Request, Response, NextFunction } from "express";
import GenreService from "../services/genre.service";

export default class GenreController {
	constructor(private genreService: GenreService) {}
	public async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
		try {
			const genres = await this.genreService.find();
			res.send({ status: "success", result: genres });
		} catch (error) {
			next(error);
		}
	}
}
