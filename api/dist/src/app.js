"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const index_routes_1 = __importDefault(require("./routes/index.routes"));
const cors_1 = __importDefault(require("cors"));
require("./db");
const handleErrors_1 = __importDefault(require("./middlewares/handleErrors"));
const _404_1 = __importDefault(require("./middlewares/404"));
//Initialize
const server = (0, express_1.default)();
//Settings
server.use(express_1.default.urlencoded({ extended: true, limit: '50mb' }));
server.use(express_1.default.json({ limit: '50mb' }));
server.use((0, cors_1.default)());
//Middlewares
server.use((0, morgan_1.default)("dev"));
//All routes
server.use('/api', index_routes_1.default);
// 404 Page not found
server.use("*", _404_1.default);
// Error catching endware.
server.use(handleErrors_1.default);
exports.default = server;
