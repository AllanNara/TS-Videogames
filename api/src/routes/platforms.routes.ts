import { IRouter, Router } from 'express';
import { allPlatforms } from "../controllers/platforms.controllers";

const router: IRouter  = Router();

router.get('/', allPlatforms);

export default router;