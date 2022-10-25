"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
require("reflect-metadata");
const app_1 = __importDefault(require("./src/app"));
const db_1 = __importDefault(require("./src/db"));
const add_genres_db_1 = require("./src/helpers/add_genres_db");
const add_platforms_db_1 = require("./src/helpers/add_platforms_db");
(function () {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield db_1.default.initialize();
            console.log("Database conected");
            yield (0, add_genres_db_1.addGenres)();
            yield (0, add_platforms_db_1.addPlatforms)();
            app_1.default.listen(3001, () => {
                console.log('Listening on port 3001');
            });
        }
        catch (error) {
            if (error instanceof Error) {
                console.log({ ErrorMsg: error.message });
            }
            else {
                console.log(error);
            }
        }
    });
})();
