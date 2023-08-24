import { DataSource } from "typeorm";
import environments from "../config/environments";
const { DB_CONFIG } = environments;

const AppDataSource = new DataSource({
	type: "postgres",
	host: DB_CONFIG.host,
	port: DB_CONFIG.port,
	username: DB_CONFIG.user,
	password: DB_CONFIG.password,
	database: DB_CONFIG.database,
	entities: [__dirname + "/Repository/entity/*{.js,.ts}"],
	logging: false,
	synchronize: true,
});

export default AppDataSource;
