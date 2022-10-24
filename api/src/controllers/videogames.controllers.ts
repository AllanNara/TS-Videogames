import { Request as Req, Response as Res, NextFunction as Next } from "express";
import { Videogame } from "../models";
import { getGamesApi } from "../services/gamesRawgApi";
import { CustomError } from "../utils/customError";
// import { Game } from "../utils/classGame";


export const allVideogames = async (req: Req, res: Res, next: Next): Promise<any> => {
  const { name } = req.query;
  try {
    if(Array.isArray(name)) throw new CustomError("Only accept one query 'name'", 400);

    const result = await getGamesApi(name as string);
    if(result.length === 0) {
      return res.status(200).json({empty: "Game not found"})
    };

    result.sort((a, b) => b.rating - a.rating);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
