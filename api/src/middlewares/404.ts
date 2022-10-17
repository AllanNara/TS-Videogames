import { NextFunction as Next, Request as Req, Response as Res } from "express";

function pageNotFound(req: Req, res: Res, _: Next): void {
  let page404: string = req.params[0].replace("/api", "");
  let msg: string = "Sorry, and error has occurred, Requested page not found!";
  res.status(404).send(`<h2>404 NOT FOUND</h2> <p>${msg}</p> <small>"${page404}"</small>` )
};

export default pageNotFound;