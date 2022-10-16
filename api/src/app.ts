import express, { Express } from 'express';
import morgan from 'morgan';
import routes from './routes/index.routes';
import cors from 'cors';
import "./db";

import handleError from './middlewares/handleErrors';


//Initialize
const server: Express = express();

//Settings
server.use(express.urlencoded({ extended: true, limit: '50mb' }));
server.use(express.json({ limit: '50mb' }));
server.use(cors());

//Middlewares
server.use(morgan("dev"));

//All routes
server.use('/api', routes);

// Error catching endware.
server.use(handleError);

export default server;
