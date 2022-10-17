import { Request as Req, Response as Res, NextFunction as Next } from "express";
import { Videogame } from "../models";

export const getVideogameById = async(req: Req, res: Res, next: Next): Promise<any> => {
  try {
    res.sendStatus(200)
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
