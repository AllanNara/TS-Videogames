import { DataSource } from "typeorm";
import * as models from "./models";
const allModels = Object.values(models);

const AppDataSource = new DataSource({
  type: 'postgres',
  host: "localhost",
  port: 5432,
  username: "allannaranjo",
  password: "unodoscuatro",
  database: "videogames_ts",
  entities: [...allModels],
  logging: false,
  synchronize: true,
});

export default AppDataSource;
