"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameDetail = exports.Game = void 0;
class Game {
    constructor(id, name, image, genres, platforms, rating = 0, isDataBase = false) {
        this.id = id;
        this.rating = rating;
        this.name = name;
        this.isDataBase = isDataBase;
        this.image = image;
        this.genres = genres;
        this.platforms = platforms;
    }
}
exports.Game = Game;
class GameDetail extends Game {
    constructor(id, name, image, genres, platforms, description, released, rating = 0, isDataBase = false) {
        super(id, name, image, genres, platforms, rating, isDataBase);
        this.description = description;
        this.released = released;
    }
}
exports.GameDetail = GameDetail;
