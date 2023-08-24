import { IRouter, Router } from "express";
import PlatformController from "../controllers/platforms.controllers";
import PlatformService from "../services/platform.service";
import PlatformRepository from "../Repository/platform.repository";
import Platform from "../Repository/entity/Platform";
import AppDataSource from "../AppDataSource";
import { Repository, EntityManager } from "typeorm";

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

	private initializeRoutes() {
		this.router.get("/", this.platformController.getAll);
	}

	public getRouter() {
		return this.router;
	}
}

const platformsRoutes = new PlatformsRoutes();
export default platformsRoutes.getRouter();
