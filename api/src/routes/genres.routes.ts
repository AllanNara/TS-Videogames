import { IRouter, Router } from "express";
import genresController from "../controllers/genres.controller";

const router: IRouter = Router();

router.get("/", genresController.getAll);

export default router;
