import { IRouter, Router } from "express";
import GenresController from "../controllers/genres.controller";
import GenreService from "../services/genre.service";
import GenreRepository from "../Repository/genre.repository";
import Genre from "../Repository/entity/Genre";
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
		const genreRepository = new GenreRepository(
			AppDataSource.manager.getRepository(Genre)
		);
		const genreService = new GenreService(genreRepository);
		this.genresController = new GenresController(genreService);
	}

	private async initializeRoutes() {
		this.router.get("/", this.genresController.getAll);
	}

	public getRouter() {
		return this.router;
	}
}

const genresRoutes = new GenresRoutes();
export default genresRoutes.getRouter();
