import { Request as Req, Response as Res, NextFunction as Next } from "express";
import { Videogame } from "../models";

export const allVideogames = async(req: Req, res: Res, next: Next): Promise<any> => {
  try {
    res.sendStatus(200)
  } catch (error) {
    next(error)
  }
};
