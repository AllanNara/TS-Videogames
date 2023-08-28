import express, { Express } from "express";
import environments from "../config/environments";
import morgan from "morgan";
import GenresRoutes from "./routes/genres.routes";
import PlatformsRoutes from "./routes/platforms.routes";
import VideogamesRoutes from "./routes/videogames.routes";

import cors from "cors";
import "./AppDataSource";

import { errorHandler } from "./middlewares/ErrorHandler";
import { pageNotFound } from "./middlewares/404";
import AppDataSource from "./AppDataSource";

export default class App {
	constructor(
		private app: Express = express(),
		private PORT: number = environments.PORT,
		private genresRoutes = new GenresRoutes(),
		private platformsRoutes = new PlatformsRoutes(),
		private videogamesRoutes = new VideogamesRoutes()
	) {
		this.setupMiddlewares();
		this.setupRoutes();
	}

	private setupMiddlewares() {
		this.app.use(cors());
		this.app.use(express.json({ limit: "50mb" }));
		this.app.use(express.urlencoded({ extended: true }));
		this.app.use(morgan("dev"));
	}

	private setupRoutes() {
		this.app.use("/api/genres", this.genresRoutes.getRouter());
		this.app.use("/api/platforms", this.platformsRoutes.getRouter());
		this.app.use("/api/videogames", this.videogamesRoutes.getRouter());
		this.app.use("*", pageNotFound);
		this.app.use(errorHandler);
	}

	public async setupDatabase() {
		try {
			await AppDataSource.initialize();
			console.log("Database conected");
		} catch (error) {
			console.log("Error connecting to Database:", error);
		}
	}

	public startServer() {
		this.app.listen(this.PORT, () => {
			console.log(`Server running on port ${this.PORT}`);
		});
	}
}
