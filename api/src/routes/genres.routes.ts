import { IRouter, Router } from 'express';
import { allGenres } from "../controllers/genres.controllers";

const router: IRouter  = Router();

router.get('/', allGenres);

export default router;