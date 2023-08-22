import { Repository } from "typeorm";
import Platform from "./entity/Platform";

export default class PlatformRepository extends Repository<Platform> {
	async findAll(): Promise<Platform[]> {
		const platforms = await this.find();
		return platforms;
	}

	async findByName(name: string) {
		const platform = await this.findOne({ where: { name } });
		return platform;
	}

	async createPlatform(platformData: Partial<Platform>): Promise<Platform> {
		const platform = this.create(platformData);
		await this.save(platform);
		return platform;
	}
}
