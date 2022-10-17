import { Request as Req, Response as Res, NextFunction as Next } from "express";
import { Platform } from "../models";

export const allPlatforms = async(req: Req, res: Res, next: Next): Promise<any> => {
  try {
    const response = await Platform.find();
    if(!response.length) {
      return res.status(200).json({ message: "No content available." });
    }
    res.status(200).json(response);
  } catch (error) {
    next(error)
  }
};
