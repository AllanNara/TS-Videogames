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
exports.getGamesApi = void 0;
const axios_1 = __importDefault(require("axios"));
const classGame_1 = require("../utils/classGame");
const { API_KEY } = process.env;
function getGamesApi(name) {
    return __awaiter(this, void 0, void 0, function* () {
        // CONTAINER WITH ALL RESULTS (DATABASE AND API)
        let result = [];
        const callApi = Boolean(name)
            ? `https://api.rawg.io/api/games?search=${name}&page_size=40&key=${API_KEY}`
            : `https://api.rawg.io/api/games?page_size=40&key=${API_KEY}`;
        // VARIABLE FOR RESULTS FROM API
        let promisesResultApi = [];
        if (!Boolean(name)) {
            const nexts = axios_1.default.get(`${callApi}&page=1`);
            const nexts1 = axios_1.default.get(`${callApi}&page=2`);
            const nexts2 = axios_1.default.get(`${callApi}&page=3`);
            // RESOLVE PROMISES
            yield Promise.all([nexts, nexts1, nexts2])
                .then((response) => {
                promisesResultApi.push(...response[0].data.results, ...response[1].data.results, ...response[2].data.results);
            });
        }
        else { // CASE EXIST NAME QUERY
            for (let i = 1; i <= 3; i++) {
                const response = yield axios_1.default.get(`${callApi}&page=${i}`);
                promisesResultApi.push(...response.data.results);
                if (!response.data.next)
                    break;
            }
            ;
        }
        ;
        // MAP ALL GAMES FROM API IN VARIABLE RESULT
        promisesResultApi.forEach((data) => {
            let platforms = data.platforms.map((pl) => {
                return { name: pl.platform.name, id: pl.platform.id };
            });
            let genres = data.genres.map((gr) => {
                return { name: gr.name, id: gr.id };
            });
            let game = new classGame_1.Game(data.id, data.name, data.background_image, genres, platforms, data.rating);
            result.push(game);
        });
        return result;
    });
}
exports.getGamesApi = getGamesApi;
