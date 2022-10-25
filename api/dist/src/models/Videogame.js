"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Videogame = void 0;
const typeorm_1 = require("typeorm");
const class_validator_1 = require("class-validator");
const Genre_1 = require("./Genre");
const Platform_1 = require("./Platform");
let Videogame = class Videogame extends typeorm_1.BaseEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], Videogame.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)("float", { default: 0, nullable: true }),
    (0, class_validator_1.Max)(5),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], Videogame.prototype, "rating", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], Videogame.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)("boolean", { default: true }),
    __metadata("design:type", Boolean)
], Videogame.prototype, "isDataBase", void 0);
__decorate([
    (0, typeorm_1.Column)("text", { nullable: true }),
    __metadata("design:type", String)
], Videogame.prototype, "image", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)((type) => Genre_1.Genre, (genre) => genre.videogames),
    (0, typeorm_1.JoinTable)({
        name: "game_genres",
        joinColumn: {
            name: "videogameId",
        },
        inverseJoinColumn: {
            name: "genreId",
        },
    }),
    __metadata("design:type", Array)
], Videogame.prototype, "genres", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)((type) => Platform_1.Platform, (platform) => platform.videogames),
    (0, typeorm_1.JoinTable)({
        name: "game_platforms",
        joinColumn: {
            name: "videogameId",
        },
        inverseJoinColumn: {
            name: "platformId",
        },
    }),
    __metadata("design:type", Array)
], Videogame.prototype, "platforms", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 40, unique: true }),
    __metadata("design:type", String)
], Videogame.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)("date", { default: new Date().toISOString().split("T")[0], nullable: true }),
    __metadata("design:type", Date)
], Videogame.prototype, "released", void 0);
Videogame = __decorate([
    (0, typeorm_1.Entity)("videogames")
], Videogame);
exports.Videogame = Videogame;
