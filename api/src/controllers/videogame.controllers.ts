import { Request as Req, Response as Res, NextFunction as Next } from "express";
import { AllDetailGame } from "../../types";
import { Videogame } from "../models";
import { gameDetailApi } from "../services/gameDetailRawgApi";
import { CustomError } from "../utils/customError";

const { API_KEY } = process.env;

export const getVideogameById = async(req: Req, res: Res, next: Next): Promise<any> => {
  const { idVideogame } = req.params;
  try {
    let game: AllDetailGame | null = null;
    if(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(idVideogame)){
        // const inDataBase = await Videogame.findByPk(idVideogame, { include: [Genre] });
        // let result = inDataBase ? inDataBase.toJSON() : null;
        // game = new GameDetail()
      } else if(/^[0-9]*$/.test(idVideogame)){
        game = await gameDetailApi(idVideogame as string);
    } else {
      throw new CustomError("Parameter 'ID' not valid", 400, "Parameter ID only receive number or UUID")
    };

    res.status(200).json(game)
  } catch (error) {
    next(error)
  }
}

export const newVideogame = async(req: Req, res: Res, next: Next): Promise<any> => {
  try {
    res.sendStatus(204)
  } catch (error) {
    next(error)
  }
}
