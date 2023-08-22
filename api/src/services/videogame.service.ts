import AppDataSource from "../AppDataSource";
import Videogame from "../Repository/entity/Videogame";
import VideogameRepository from "../Repository/videogame.repository";
import GameDetailsApi from "../interfaces/game_details_api";
import CustomError from "../utils/customError";
import genreService from "./genre.service";
import platformService from "./platform.service";
import { getGameDetailsApi } from "./utils/GameDetailsApi";
import { getGamesApi } from "./utils/GamesApi";

class VideogameService {
	constructor(
		private repository: VideogameRepository = new VideogameRepository(
			Videogame,
			AppDataSource.manager
		)
	) {}

	async find(name?: string) {
		try {
			const resultsDB = await this.repository.findAll(name);
			const resultsAPI = await getGamesApi(name);
			const result = [...resultsAPI, ...resultsDB];
			if (!result.length) {
				throw new CustomError(`Games not found`, 404);
			}
			result.sort((a, b) => b.rating - a.rating);
			return result;
		} catch (error) {
			throw new CustomError();
		}
	}

	async findById(id: string) {
		const uuidRegex = new RegExp(
			/^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i
		);

		try {
			let result: Videogame | GameDetailsApi | null;
			if (uuidRegex.test(id)) {
				result = await this.repository.findGameById(id);
			} else if (/^[0-9]*$/.test(id)) {
				result = await getGameDetailsApi(id);
			} else {
				throw new CustomError(
					"Parameter 'ID' not valid",
					400,
					"Parameter ID only receive number or UUID"
				);
			}

			if (!result)
				throw new CustomError(
					`Videogame with id ${id} not found`,
					404,
					"Error in the videogame service"
				);
			return result;
		} catch (error) {
			throw new CustomError();
		}
	}

	async create(game: Partial<Videogame>, platforms: string[], genres: string[]) {
		try {
			const foundPlatforms = await platformService.find(platforms);
			const foundGenres = await genreService.find(genres);
			const result = await this.repository.createVideogame(
				game,
				foundPlatforms,
				foundGenres
			);
			return result.id;
		} catch (error) {
			throw new CustomError();
		}
	}

	async delete(id: string) {
		try {
			const { affected } = await this.repository.deleteById(id);
			if (!affected) throw new CustomError("No rows affected", 400);
			return true;
		} catch (error) {
			throw new CustomError();
		}
	}
}

export default new VideogameService();
