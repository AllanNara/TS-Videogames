import { FindManyOptions, Repository } from "typeorm";
import Platform from "./entity/Platform";

type GenrePlatform = Partial<Platform> | Partial<Platform>[];

export default class PlatformRepository {
	constructor(private repository: Repository<Platform>) {}
	async findAllPlatforms(names?: { name: string }[]): Promise<Platform[]> {
		const options: FindManyOptions = {};
		if (names) options.where = names;
		const platforms = await this.repository.find(options);
		return platforms;
	}

	async findPlatform(name: string): Promise<Platform | null> {
		const platform = await this.repository.findOne({ where: { name } });
		return platform;
	}

	async createPlatform(platformData: GenrePlatform): Promise<Platform[] | Platform> {
		let platform: Platform[] | Platform;
		if (Array.isArray(platformData)) {
			platform = this.repository.create(platformData);
			await this.repository.save(platform);
		} else {
			platform = this.repository.create(platformData);
			await this.repository.save(platform);
		}
		return platform;
	}
}
