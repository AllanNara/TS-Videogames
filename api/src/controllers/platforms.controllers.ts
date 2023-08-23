import { Request, Response, NextFunction } from "express";
import platformService from "../services/platform.service";

class PlatformController {
	public async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
		try {
			const platforms = await platformService.find();
			res.send({ status: "success", result: platforms });
		} catch (error) {
			next(error);
		}
	}
}

export default new PlatformController();
