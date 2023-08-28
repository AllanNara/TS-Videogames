import AppDataSource from "../AppDataSource";

import Genre from "../Repository/entity/Genre";
import GenreRepository from "../Repository/genre.repository";
import GenreService from "../services/genre.service";
const genreRepository = new GenreRepository(AppDataSource.manager.getRepository(Genre));
const genreService = new GenreService(genreRepository);

import Platform from "../Repository/entity/Platform";
import PlatformRepository from "../Repository/platform.repository";
import PlatformService from "../services/platform.service";
const platformRepository = new PlatformRepository(
	AppDataSource.manager.getRepository(Platform)
);
const platformService = new PlatformService(platformRepository);

import Videogame from "../Repository/entity/Videogame";
import VideogameRepository from "../Repository/videogame.repository";
import VideogameService from "../services/videogame.service";
const videogameRepository = new VideogameRepository(
	AppDataSource.manager.getRepository(Videogame)
);
const videogameService = new VideogameService(
	videogameRepository,
	platformService,
	genreService
);

import VideogamesControllers from "../controllers/videogames.controllers";
const videogamesControllers = new VideogamesControllers(videogameService);

export async function addVideogame(): Promise<void> {
	try {
		const resultGameCreated = await videogameService.create(
			{
				name: "GTA 5",
				description: "This is the last version of GTA",
				image: "https://picsum.photos/536/354?image=100",
				rating: 5,
			},
			["PC"],
			["Action", "RPG"]
		);

		console.log("Videogame added: ", resultGameCreated);
	} catch (error) {
		// const all = await videogamesControllers.prueba();
		// console.log({ all });

		console.log("Videogame alredy create");
		// console.log("Fatal Error: ", error);
	}
}
