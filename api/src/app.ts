import express, { Express } from "express";
import morgan from "morgan";
import routes from "./routes/index.routes";
import cors from "cors";
import "./DataSource";

import handleError from "./middlewares/handleErrors";
import pageNotFound from "./middlewares/404";

//Initialize
const server: Express = express();

//Settings
server.use(express.urlencoded({ extended: true, limit: "50mb" }));
server.use(express.json({ limit: "50mb" }));
server.use(cors());

//Middlewares
server.use(morgan("dev"));

//All routes
server.use("/api", routes);

// 404 Page not found
server.use("*", pageNotFound);

// Error catching endware.
server.use(handleError);

export default server;
