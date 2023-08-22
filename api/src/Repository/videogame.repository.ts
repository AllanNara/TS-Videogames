import { DeleteResult, Repository } from "typeorm";
import Videogame from "./entity/Videogame";
import Platform from "./entity/Platform";
import Genre from "./entity/Genre";

export default class VideogameRepository extends Repository<Videogame> {
	async findAll(): Promise<Videogame[]> {
		const videogames = await this.find();
		return videogames;
	}

	async findById(id: string): Promise<Videogame> {
		const videogame = await this.findOneBy({ id });
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
