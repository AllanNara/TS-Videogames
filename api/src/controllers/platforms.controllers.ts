import { Request, Response, NextFunction } from "express";
import PlatformService from "../services/platform.service";

export default class PlatformController {
	constructor(private platformService: PlatformService) {}
	public async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
		try {
			const platforms = await this.platformService.find();
			res.send({ status: "success", result: platforms });
		} catch (error) {
			next(error);
		}
	}
}
