import { IRouter, Router, Request, Response, NextFunction } from "express";
import PlatformController from "../controllers/platforms.controllers";
import PlatformService from "../services/platform.service";
import PlatformRepository from "../Repository/platform.repository";
import Platform from "../Repository/entity/Platform";
import AppDataSource from "../AppDataSource";
import { Repository } from "typeorm";

class PlatformsRoutes {
	private router: IRouter;
	private platformController: PlatformController;

	constructor() {
		this.router = Router();
		this.initializePlatformController();
		this.initializeRoutes();
	}

	private initializePlatformController() {
		const repository = new Repository(Platform, AppDataSource.manager);
		const platformRepository = new PlatformRepository(repository);
		const platformService = new PlatformService(platformRepository);
		this.platformController = new PlatformController(platformService);
	}

	private getAllPlatforms(req: Request, res: Response, next: NextFunction) {
		return this.platformController.getAll(req, res, next);
	}

	private initializeRoutes() {
		this.router.get("/", this.getAllPlatforms.bind(this));
	}

	public getRouter() {
		return this.router;
	}
}

export default PlatformsRoutes;
