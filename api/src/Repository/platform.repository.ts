import { Repository } from "typeorm";
import Platform from "./entity/Platform";

export default class PlatformRepository extends Repository<Platform> {
	async findAll(names?: string[]): Promise<Platform[]> {
		const options: { where?: Object } = {};
		if (names) options.where = { names };
		const platforms = await this.find(options);
		return platforms;
	}

	async findPlatform(name: string): Promise<Platform | null> {
		const platform = await this.findOne({ where: { name } });
		return platform;
	}

	async createPlatform(
		platformData: Partial<Platform> | Partial<Platform>[]
	): Promise<Platform[] | Platform> {
		let platform: Platform[] | Platform;
		if (Array.isArray(platformData)) {
			platform = this.create(platformData);
			await this.save(platform);
		} else {
			platform = this.create(platformData);
			await this.save(platform);
		}
		return platform;
	}
}
