import PlatformRepository from "../Repository/platform.repository";
import CustomError from "../utils/customError";

type newPlatform = { name: string; id: number };

export default class PlatformService {
	constructor(private repository: PlatformRepository) {}

	async find(names?: string[]) {
		const result = await this.repository.findAllPlatforms(names);
		if (!result.length && names) {
			throw new CustomError("Platform not found.", 404);
		} else if (!result.length) {
			throw new CustomError(
				"Database not loaded with platforms.",
				500,
				"No platforms found in the database, possible preload error"
			);
		}
		return result;
	}

	async findByName(name: string) {
		const result = await this.repository.findPlatform(name);
		if (!result)
			throw new CustomError(
				`Platform "${name}" not found`,
				404,
				"Error in the platform service"
			);
		return result;
	}

	async create(platform: newPlatform | newPlatform[]) {
		const result = await this.repository.createPlatform(platform);
		return result;
	}
}
