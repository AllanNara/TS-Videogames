import { Request as Req, Response as Res, NextFunction as Next } from "express";
import { Genre } from "../models";

export const allGenres = async(req: Req, res: Res, next: Next): Promise<any> => {
  try {
    const response = await Genre.find();
    if(!response.length) {
      return res.status(200).json({ message: "No content available." });
    }
    res.status(200).json(response);
  } catch (error) {
    next(error)
  }
};

