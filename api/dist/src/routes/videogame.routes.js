"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const videogame_controllers_1 = require("../controllers/videogame.controllers");
const router = (0, express_1.Router)();
router.get('/:idVideogame', videogame_controllers_1.getVideogameById);
router.post('/', videogame_controllers_1.newVideogame);
exports.default = router;
