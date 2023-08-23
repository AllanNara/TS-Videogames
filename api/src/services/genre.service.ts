import AppDataSource from "../AppDataSource";
import Genre from "../Repository/entity/Genre";
import GenreRepository from "../Repository/genre.repository";
import CustomError from "../utils/customError";

class GenreService {
	private repository: GenreRepository;

	constructor() {
		this.repository = new GenreRepository(Genre, AppDataSource.manager);
	}

	async find(names?: string[]) {
		try {
			const result = await this.repository.findAll(names);
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
		} catch (error) {
			throw new CustomError();
		}
	}

	async findByName(name: string) {
		try {
			const result = await this.repository.findGenre(name);
			if (!result)
				throw new CustomError(
					`Genre "${name}" not found`,
					404,
					"Error in the genre service"
				);
			return result;
		} catch (error) {
			throw new CustomError();
		}
	}

	async create(obj: { name: string }) {
		try {
			const result = await this.repository.createGenre(obj);
			return result;
		} catch (error) {
			throw new CustomError();
		}
	}
}

export default new GenreService();
