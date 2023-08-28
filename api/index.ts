import "reflect-metadata";
import App from "./src/app";
import { addGenres } from "./src/helpers/add_genres_db";
import { addPlatforms } from "./src/helpers/add_platforms_db";
import { addVideogame } from "./src/helpers/add_videogame";

const app = new App();

(async function () {
	try {
		await app.setupDatabase();
		app.startServer();
		await addGenres();
		await addPlatforms();
		await addVideogame();
	} catch (error) {
		console.log(error);
	}
})();
