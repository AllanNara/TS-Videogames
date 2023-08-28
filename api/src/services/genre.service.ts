import GenreRepository from "../Repository/genre.repository";
import CustomError from "../utils/customError";

type newGenre = { name: string; id: number };

export default class GenreService {
	constructor(private repository: GenreRepository) {}

	async find(names?: { name: string }[]) {
		const result = await this.repository.findAllGenres(names);
		if (!result.length && names) {
			throw new CustomError("Genres not found.", 404);
		} else if (!result.length) {
			throw new CustomError(
				"Database not loaded with genres.",
				500,
				"No genres found in the database, possible preload error"
			);
		}
		return result;
	}

	async findByName(name: string) {
		const result = await this.repository.findGenre(name);
		if (!result)
			throw new CustomError(
				`Genre "${name}" not found`,
				404,
				"Error in the genre service"
			);
		return result;
	}

	async create(genre: newGenre | newGenre[]) {
		const result = await this.repository.createGenre(genre);
		return result;
	}
}
