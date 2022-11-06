import { Enviroment } from "../../types/types";

const DEVELOPMENT: Enviroment = {
  PORT: process.env.PORT,
  DB: {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: process.env.DB
  }
};

export default DEVELOPMENT
