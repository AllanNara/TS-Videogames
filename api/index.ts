import "reflect-metadata";
import server from "./src/app";
import AppDataSource from "./src/AppDataSource";
import { addGenres } from "./src/helpers/add_genres_db";
import { addPlatforms } from "./src/helpers/add_platforms_db";
import environments from "./config/environments";

(async function () {
	try {
		await AppDataSource.initialize();
		console.log("Database conected");
		await addGenres();
		await addPlatforms();
		server.listen(environments.PORT, () => {
			console.log(`Listening on port ${environments.PORT}`);
		});
	} catch (error) {
		if (error instanceof Error) {
			console.log(error);
			console.log({ ErrorMsg: error.message });
		} else {
			console.log(error);
		}
	}
})();
