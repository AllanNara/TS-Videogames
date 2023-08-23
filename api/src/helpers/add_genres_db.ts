import axios from "axios";
import config from "../../config/environments";
import genreService from "../services/genre.service";
import GenresApi from "../interfaces/genres_api";

export async function addGenres(): Promise<void> {
	const findGenres = await genreService.find().catch(console.log);
	if (findGenres?.length) return console.log("Genres alredy charged");

	const { data } = await axios.get<GenresApi>(
		`https://api.rawg.io/api/genres?key=${config.API_KEY}`
	);

	const genres = data.results.map(({ id, name }) => {
		return { id, name };
	});
	genres.push({ name: "Web", id: 171 });
	genreService.create(genres);

	console.log("Genres added");
}
