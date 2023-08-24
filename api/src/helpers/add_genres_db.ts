import axios from "axios";
import config from "../../config/environments";
import GenresApi from "../interfaces/genres_api";
import GenreService from "../services/genre.service";
import GenreRepository from "../Repository/genre.repository";
import Genre from "../Repository/entity/Genre";
import AppDataSource from "../AppDataSource";
// import { Repository } from "typeorm";
// const repository = new Repository(Genre, AppDataSource.manager);
const genreRepository = new GenreRepository(AppDataSource.manager.getRepository(Genre));
const genreService = new GenreService(genreRepository);

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
