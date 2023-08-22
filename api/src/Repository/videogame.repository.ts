import { DeleteResult, Repository } from "typeorm";
import Videogame from "./entity/Videogame";
import Platform from "./entity/Platform";
import Genre from "./entity/Genre";
import { Like } from "typeorm";

export default class VideogameRepository extends Repository<Videogame> {
	async findAll(name?: string): Promise<Videogame[]> {
		const options: { relations: Object; where?: Object } = {
			relations: {
				genres: true,
				platforms: true,
			},
		};
		if (name) options.where = { name: Like(`%${name}%`) };
		const videogames = await this.find(options);
		return videogames;
	}

	async findGameById(id: string): Promise<Videogame | null> {
		const videogame = await this.findOne({
			where: { id },
			relations: {
				platforms: true,
				genres: true,
			},
		});
		return videogame;
	}

	async createVideogame(
		videogameData: Partial<Videogame>,
		platforms: Platform[],
		genres: Genre[]
	): Promise<Videogame> {
		const videogame = this.create(videogameData);
		videogame.platforms = platforms;
		videogame.genres = genres;
		await this.save(videogame);
		return videogame;
	}

	async deleteById(id: string): Promise<DeleteResult> {
		const videogame = await this.delete(id);
		return videogame;
	}
}
