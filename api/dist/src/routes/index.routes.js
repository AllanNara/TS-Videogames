"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const express_1 = require("express");
const router = (0, express_1.Router)();
const basename = path_1.default.basename(__filename);
fs_1.default.readdirSync(__dirname).forEach((file) => {
    if ((file.slice(-10, -2) !== ".routes.") || (file === basename))
        return;
    // Configurar los routers
    let name = file.substring(0, file.indexOf(file.slice(-10)));
    // CONSIDERAR SI ES MEJOR MEZCLAR EN ESTE ARCHIVO COMMONJS CON ECMASCRIPT MODULE,
    // O HACER LO MISMO QUE CON LA CARPETA MODELS
    const cb = require(path_1.default.join(__dirname, file));
    router.use(`/${name}`, cb.default);
});
exports.default = router;
