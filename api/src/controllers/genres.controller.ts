import { Request, Response, NextFunction } from "express";
import genreService from "../services/genre.service";

class GenreController {
	public async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
		try {
			const genres = await genreService.find();
			res.send({ status: "success", result: genres });
		} catch (error) {
			next(error);
		}
	}
}

export default new GenreController();
