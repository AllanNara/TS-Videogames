import { FindManyOptions, Repository } from "typeorm";
import Genre from "./entity/Genre";

type GenreData = Partial<Genre> | Partial<Genre>[];

export default class GenreRepository {
	constructor(private repository: Repository<Genre>) {}
	async findAllGenres(names?: { name: string }[]): Promise<Genre[]> {
		const options: FindManyOptions = {};
		if (names) options.where = names;
		const genres = await this.repository.find(options);
		return genres;
	}

	async findGenre(name: string): Promise<Genre | null> {
		const genre = await this.repository.findOne({ where: { name } });
		return genre;
	}

	async createGenre(genreData: GenreData): Promise<Genre | Genre[]> {
		let genre: Genre[] | Genre;
		if (Array.isArray(genreData)) {
			genre = this.repository.create(genreData);
			await this.repository.save(genre);
		} else {
			genre = this.repository.create(genreData);
			await this.repository.save(genre);
		}
		return genre;
	}
}
