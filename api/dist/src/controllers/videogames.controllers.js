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
exports.allVideogames = void 0;
const models_1 = require("../models");
const gamesRawgApi_1 = require("../services/gamesRawgApi");
const customError_1 = require("../utils/customError");
const typeorm_1 = require("typeorm");
const allVideogames = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = req.query;
    try {
        if (Boolean(name) && Array.isArray(name))
            throw new customError_1.CustomError("Only accept one query 'name'", 400);
        let result = [];
        const gamesDb = yield models_1.Videogame.find({
            where: name ? {
                name: (0, typeorm_1.Like)(`%${name}%`)
            } : undefined,
            select: {
                id: true,
                rating: true,
                name: true,
                isDataBase: true,
                image: true
            },
            relations: {
                genres: true,
                platforms: true
            }
        });
        const gamesApi = yield (0, gamesRawgApi_1.getGamesApi)(name);
        result = [...gamesDb, ...gamesApi];
        if (result.length === 0) {
            return res.status(200).json({ empty: "Game not found" });
        }
        ;
        result.sort((a, b) => b.rating - a.rating);
        res.status(200).json(result);
    }
    catch (error) {
        next(error);
    }
});
exports.allVideogames = allVideogames;
