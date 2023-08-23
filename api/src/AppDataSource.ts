import { DataSource } from "typeorm";

const AppDataSource = new DataSource({
	type: "postgres",
	host: "localhost",
	port: 5432,
	username: "postgres",
	password: "postgres",
	database: "videogames_ts",
	entities: [__dirname + "/Repository/entity/*{.js,.ts}"],
	logging: false,
	synchronize: true,
});

export default AppDataSource;
