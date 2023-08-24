import { getGameDetailsApi } from "./utils/GameDetailsApi";
import { getGamesApi } from "./utils/GamesApi";
import CustomError from "../utils/customError";
import GenreService from "./genre.service";
import ParsedGame from "../interfaces/game_dto";
import PlatformService from "./platform.service";
import Videogame from "../Repository/entity/Videogame";
import VideogameDto from "../DTOs/videogame.dto";
import VideogameRepository from "../Repository/videogame.repository";

export default class VideogameService {
	constructor(
		private repository: VideogameRepository,
		private platformService: PlatformService,
		private genreService: GenreService
	) {}

	async find(name?: string) {
		const resultsDB = await this.repository.findAllGames(name);
		const resultsAPI = await getGamesApi(name);
		const resultDBParsed = resultsDB.map((game) => {
			return new VideogameDto(game);
		});

		const result = [...resultDBParsed, ...resultsAPI];
		if (!result.length) {
			throw new CustomError(`Games not found`, 404);
		}
		result.sort((a, b) => b.rating - a.rating);
		return result;
	}

	async searchAndParsedGameByIdType(id: string): Promise<ParsedGame | null> {
		const uuidRegex = new RegExp(
			/^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i
		);
		if (uuidRegex.test(id)) {
			const game = await this.repository.findGameById(id);
			return game ? new VideogameDto(game) : game;
		}
		if (/^[0-9]*$/.test(id)) return await getGameDetailsApi(id);

		throw new CustomError(
			"Parameter 'ID' not valid",
			400,
			"Parameter ID only receive number or UUID"
		);
	}

	async findById(id: string) {
		let result = this.searchAndParsedGameByIdType(id);
		if (!result)
			throw new CustomError(
				`Videogame with id ${id} not found`,
				404,
				"Error in the videogame service"
			);
		return result;
	}

	async create(game: Partial<Videogame>, platforms: string[], genres: string[]) {
		const foundPlatforms = await this.platformService.find(platforms);
		const foundGenres = await this.genreService.find(genres);
		const result = await this.repository.createVideogame(
			game,
			foundPlatforms,
			foundGenres
		);
		return result.id;
	}

	async delete(id: string) {
		const { affected } = await this.repository.deleteById(id);
		if (!affected) throw new CustomError("No rows affected", 400);
		return true;
	}
}
