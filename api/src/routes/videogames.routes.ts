import { IRouter, Router } from "express";
import videogamesControllers from "../controllers/videogames.controllers";

const router: IRouter = Router();

router.get("/", videogamesControllers.getAll);
router.post("/", videogamesControllers.create);
router.get("/:idVideogame", videogamesControllers.getById);
router.delete("/:idVideogame", videogamesControllers.delete);

export default router;
