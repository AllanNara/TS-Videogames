import { Repository } from "typeorm";
import Genre from "./entity/Genre";

export default class GenreRepository extends Repository<Genre> {
	async findAll(): Promise<Genre[]> {
		const genres = await this.find();
		return genres;
	}

	async findByName(name: string) {
		const genre = await this.findOne({ where: { name } });
		return genre;
	}

	async createGenre(genreData: Partial<Genre>): Promise<Genre> {
		const genre = this.create(genreData);
		await this.save(genre);
		return genre;
	}
}
