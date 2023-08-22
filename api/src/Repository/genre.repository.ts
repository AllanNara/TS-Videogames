import { Repository } from "typeorm";
import Genre from "./entity/Genre";

export default class GenreRepository extends Repository<Genre> {
	async findAll(names?: string[]): Promise<Genre[]> {
		const options: { where?: Object } = {};
		if (names) options.where = { names };
		const genres = await this.find(options);
		return genres;
	}

	async findGenre(name: string): Promise<Genre | null> {
		const genre = await this.findOne({ where: { name } });
		return genre;
	}

	async createGenre(genreData: Partial<Genre>): Promise<Genre> {
		const genre = this.create(genreData);
		await this.save(genre);
		return genre;
	}
}
