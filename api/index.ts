import dotenv from "dotenv";
dotenv.config();
import "reflect-metadata";
import server from "./src/app";
import AppDataSource from "./src/DataSource";
import { addGenres } from "./src/helpers/add_genres_db";
import { addPlatforms } from "./src/helpers/add_platforms_db";

(async function () {
	try {
		await AppDataSource.initialize();
		console.log("Database conected");
		await addGenres();
		await addPlatforms();
		server.listen(3001, () => {
			console.log("Listening on port 3001");
		});
	} catch (error) {
		if (error instanceof Error) {
			console.log({ ErrorMsg: error.message });
		} else {
			console.log(error);
		}
	}
})();
