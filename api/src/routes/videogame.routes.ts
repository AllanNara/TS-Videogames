import { IRouter, Router } from 'express';
import { getVideogameById, newVideogame } from "../controllers/videogame.controllers";

const router: IRouter  = Router();

router.get('/:idVideogame', getVideogameById);
router.post('/', newVideogame);

export default router;