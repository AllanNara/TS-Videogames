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
Object.defineProperty(exports, "__esModule", { value: true });
exports.newVideogame = exports.getVideogameById = void 0;
const models_1 = require("../models");
const gameDetailRawgApi_1 = require("../services/gameDetailRawgApi");
const customError_1 = require("../utils/customError");
const getVideogameById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { idVideogame } = req.params;
    try {
        let game;
        if (/^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(idVideogame)) {
            game = (yield models_1.Videogame.find({
                where: {
                    id: idVideogame
                },
                relations: {
                    platforms: true,
                    genres: true
                }
            }))[0];
            if (game === null) {
                throw new customError_1.CustomError("Not found.", 404, `Game with ID(${idVideogame}) not found in API`);
            }
            ;
        }
        else if (/^[0-9]*$/.test(idVideogame)) {
            game = yield (0, gameDetailRawgApi_1.gameDetailApi)(idVideogame);
        }
        else {
            throw new customError_1.CustomError("Parameter 'ID' not valid", 400, "Parameter ID only receive number or UUID");
        }
        ;
        res.status(200).json(game);
    }
    catch (error) {
        next(error);
    }
});
exports.getVideogameById = getVideogameById;
const newVideogame = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const name = req.body.name;
    const description = req.body.description;
    const platforms = req.body.platforms;
    const genres = req.body.genres;
    try {
        if (!Boolean(name) ||
            !Boolean(description) ||
            (!Boolean(platforms) || !Boolean(platforms.length)) ||
            (!Boolean(genres) || !Boolean(genres.length))) {
            throw new customError_1.CustomError("Mandatory data are missing", 400, { name, description, platforms, genres });
        }
        ;
        let modelsPlatforms = yield Promise.all(platforms.map((name) => __awaiter(void 0, void 0, void 0, function* () {
            let model = yield models_1.Platform.find({ where: { name } });
            return model[0];
        })));
        let modelsGenres = yield Promise.all(genres.map((name) => __awaiter(void 0, void 0, void 0, function* () {
            let model = yield models_1.Genre.find({ where: { name } });
            return model[0];
        })));
        const game = new models_1.Videogame();
        game.name = name;
        game.description = description;
        if (req.body.released)
            game.released = req.body.released;
        if (req.body.rating)
            game.rating = req.body.rating;
        if (req.body.image)
            game.image = req.body.image;
        game.platforms = modelsPlatforms;
        game.genres = modelsGenres;
        yield game.save();
        res.status(201).json({ id: game.id });
    }
    catch (error) {
        next(error);
    }
});
exports.newVideogame = newVideogame;
