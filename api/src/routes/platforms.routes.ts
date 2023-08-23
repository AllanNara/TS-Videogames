import { IRouter, Router } from "express";
import platformsControllers from "../controllers/platforms.controllers";

const router: IRouter = Router();

router.get("/", platformsControllers.getAll);

export default router;
