import { IRouter, Router } from "express";
import { allVideogames } from "../controllers/videogames.controllers";
import { getVideogameById, newVideogame } from "../controllers/videogame.controllers";

const router: IRouter = Router();

router.get("/", allVideogames);
router.get("/:idVideogame", getVideogameById);
router.post("/", newVideogame);

export default router;
