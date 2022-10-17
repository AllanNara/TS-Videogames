import { IRouter, Router } from 'express';
import { allVideogames } from "../controllers/videogames.controllers";

const router: IRouter  = Router();

router.get('/', allVideogames);

export default router;