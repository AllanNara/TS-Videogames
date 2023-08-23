import AppDataSource from "../AppDataSource";
import Platform from "../Repository/entity/Platform";
import PlatformRepository from "../Repository/platform.repository";
import CustomError from "../utils/customError";

class PlatformService {
	private repository: PlatformRepository;

	constructor() {
		this.repository = new PlatformRepository(Platform, AppDataSource.manager);
	}

	async find(names?: string[]) {
		const result = await this.repository.findAll(names);
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

	async create(obj: { name: string; id: number } | { name: string; id: number }[]) {
		const result = await this.repository.createPlatform(obj);
		return result;
	}
}

export default new PlatformService();
