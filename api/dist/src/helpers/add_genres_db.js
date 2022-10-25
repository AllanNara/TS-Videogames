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
exports.addGenres = void 0;
const axios_1 = __importDefault(require("axios"));
const models_1 = require("../models");
const { API_KEY } = process.env;
function addGenres() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const findGenres = yield models_1.Genre.find();
            if (!Boolean(findGenres.length)) {
                const genresApi = yield axios_1.default.get(`https://api.rawg.io/api/genres?key=${API_KEY}`);
                const genres = genresApi.data.results;
                const promises = genres.map(genre => {
                    let addGenre = new models_1.Genre();
                    addGenre.id = genre.id;
                    addGenre.name = genre.name;
                    return addGenre.save();
                });
                yield Promise.all(promises);
                console.log('Genred added');
            }
            else {
                console.log("Genres alredy charged");
            }
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
}
exports.addGenres = addGenres;
