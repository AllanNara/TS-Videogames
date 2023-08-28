import { Router, IRouter, NextFunction, Request, Response } from "express";
import { checkBodyFields } from "../middlewares/gameCreated";

import { Repository } from "typeorm";
import AppDataSource from "../AppDataSource";
const { manager } = AppDataSource;

import Genre from "../Repository/entity/Genre";
import GenreService from "../services/genre.service";
import GenreRepository from "../Repository/genre.repository";

import Platform from "../Repository/entity/Platform";
import PlatformService from "../services/platform.service";
import PlatformRepository from "../Repository/platform.repository";

import Videogame from "../Repository/entity/Videogame";
import VideogameService from "../services/videogame.service";
import VideogameRepository from "../Repository/videogame.repository";
import VideogamesControllers from "../controllers/videogames.controllers";

class VideogamesRoutes {
	private router: IRouter;
	private videogamesControllers: VideogamesControllers;

	constructor() {
		this.router = Router();
		this.initializeVideogameController();
		this.initializeRoutes();
	}

	private initializeVideogameController() {
		const genreRepository = new GenreRepository(new Repository(Genre, manager));
		const genreService = new GenreService(genreRepository);

		const platformRepository = new PlatformRepository(new Repository(Platform, manager));
		const platformService = new PlatformService(platformRepository);

		const repository = new Repository(Videogame, manager);
		const videogameRepository = new VideogameRepository(repository);
		const videogameService = new VideogameService(
			videogameRepository,
			platformService,
			genreService
		);

		this.videogamesControllers = new VideogamesControllers(videogameService);
	}

	private getAllVideogames(req: Request, res: Response, next: NextFunction) {
		return this.videogamesControllers.getAll(req, res, next);
	}

	private createVideogame(req: Request, res: Response, next: NextFunction) {
		return this.videogamesControllers.create(req, res, next);
	}

	private getGameById(req: Request, res: Response, next: NextFunction) {
		return this.videogamesControllers.getById(req, res, next);
	}

	private deleteVideogame(req: Request, res: Response, next: NextFunction) {
		return this.videogamesControllers.delete(req, res, next);
	}

	private initializeRoutes() {
		this.router
			.get("/", this.getAllVideogames.bind(this))
			.post("/", checkBodyFields, this.createVideogame.bind(this))
			.get("/:id", this.getGameById.bind(this))
			.delete("/:id", this.deleteVideogame.bind(this));
	}

	public getRouter() {
		return this.router;
	}
}

export default VideogamesRoutes;
