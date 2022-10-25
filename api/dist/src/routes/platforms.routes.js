"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const platforms_controllers_1 = require("../controllers/platforms.controllers");
const router = (0, express_1.Router)();
router.get('/', platforms_controllers_1.allPlatforms);
exports.default = router;
