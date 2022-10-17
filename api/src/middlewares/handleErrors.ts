import { NextFunction, Request as Req, Response as Res } from "express";
import { CustomError } from "../utils/customError";

function handleError(err: Error | CustomError, req: Req, res: Res, next: NextFunction) {
  let message: string;
  message = err.message || 'Oh no, this is embarrasing. We are having troubles my friend';
  
  let status: number;
  status = (err instanceof CustomError) ? err.status : 500

  console.error(err);
  res.status(status).send(message);
};

export default handleError;