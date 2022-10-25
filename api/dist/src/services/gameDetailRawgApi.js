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
exports.gameDetailApi = void 0;
const axios_1 = __importDefault(require("axios"));
const classGame_1 = require("../utils/classGame");
const customError_1 = require("../utils/customError");
const { API_KEY } = process.env;
function gameDetailApi(id) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let game;
            const find = yield axios_1.default.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`);
            const found = find.data;
            let genresGame = found.genres.map(gnr => {
                return { name: gnr.name, id: gnr.id };
            });
            let platformsGame = found.platforms.map(plt => {
                return { name: plt.platform.name, id: plt.platform.id };
            });
            game = new classGame_1.GameDetail(found.id, found.name, found.background_image, genresGame, platformsGame, found.description_raw, found.released, found.rating);
            return game;
        }
        catch (error) {
            if (axios_1.default.isAxiosError(error)) {
                throw new customError_1.CustomError((_a = error.response) === null || _a === void 0 ? void 0 : _a.statusText, (_b = error.response) === null || _b === void 0 ? void 0 : _b.status, { axiosError: error.code });
            }
            else {
                throw new customError_1.CustomError("NOT FOUND", 404, `Game with ID(${id}) not found in API`);
            }
        }
    });
}
exports.gameDetailApi = gameDetailApi;
