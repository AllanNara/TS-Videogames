import { IRouter, Router, Request, Response, NextFunction } from "express";
import Genre from "../Repository/entity/Genre";
import { Repository } from "typeorm";
import GenreRepository from "../Repository/genre.repository";
import GenreService from "../services/genre.service";
import GenresController from "../controllers/genres.controller";
import AppDataSource from "../AppDataSource";

class GenresRoutes {
	private router: IRouter;
	private genresController: GenresController;

	constructor() {
		this.router = Router();
		this.initializeGenresController();
		this.initializeRoutes();
	}

	private initializeGenresController() {
		const repository = new Repository(Genre, AppDataSource.manager);
		const genreRepository = new GenreRepository(repository);
		const genreService = new GenreService(genreRepository);
		this.genresController = new GenresController(genreService);
	}

	private getAllGenres(req: Request, res: Response, next: NextFunction) {
		return this.genresController.getAll(req, res, next);
	}

	private initializeRoutes() {
		this.router.get("/", this.getAllGenres.bind(this));
	}

	public getRouter() {
		return this.router.bind(this);
	}
}

export default GenresRoutes;
