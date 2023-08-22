import { IRouter, Router } from "express";
import { allGenres } from "../controllers/genres.controller";

const router: IRouter = Router();

router.get("/", allGenres);

export default router;
