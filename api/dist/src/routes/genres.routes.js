"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const genres_controllers_1 = require("../controllers/genres.controllers");
const router = (0, express_1.Router)();
router.get('/', genres_controllers_1.allGenres);
exports.default = router;
