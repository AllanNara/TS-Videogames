import { Request as Req, Response as Res, NextFunction as Next } from "express";
import { Videogame } from "../models";
import { getGamesApi } from "../services/gamesRawgApi";
import { CustomError } from "../utils/customError";
// import { Game } from "../utils/classGame";

const { API_KEY } = process.env;

export const allVideogames = async (req: Req, res: Res, next: Next): Promise<any> => {
  const { name } = req.query;
  try {
    if(Array.isArray(name)) throw new CustomError("Only accept one query 'name'", 400);
    // CALL API WITH FUNCTION AND RETURN ALL GAMES
    const result = await getGamesApi(name as string);
    // CONTROLLED IF GAME NOT FOUND IN API/DBS
    if(result.length === 0) {
      return res.status(200).json({empty: "Game not found"})
    };
    // ORDER RESULTS BY RATING
    result.sort((a, b) => {
      return b.rating - a.rating;
    });
    // SEND DATA
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
