import { Request, Response } from "express";
import { CustomError } from "../types";

function handleError(err: TypeError | CustomError, _: Request, res: Response): void {
  let message: string;
  message = err.message || 'Oh no, this is embarrasing. We are having troubles my friend';

  let status: number;
  status = (err instanceof CustomError) ? err.status : 500

  console.error(err);
  res.status(status).send(message);
  return
};

export default handleError;