"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const videogames_controllers_1 = require("../controllers/videogames.controllers");
const router = (0, express_1.Router)();
router.get('/', videogames_controllers_1.allVideogames);
exports.default = router;
