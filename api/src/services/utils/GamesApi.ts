import axios from "axios";
import GamesApi, { Result } from "../../interfaces/games_api";
import ParsedGame from "../../interfaces/game_dto";

const { API_KEY } = process.env;

export async function getGamesApi(name?: string): Promise<ParsedGame[]> {
	const callApi = !name
		? `https://api.rawg.io/api/games?search=${name}&page_size=40&key=${API_KEY}`
		: `https://api.rawg.io/api/games?page_size=40&key=${API_KEY}`;

	// VARIABLE FOR RESULTS FROM API
	const gamesResultApi: Result[] = [];
	for (let i = 1; i <= 3; i++) {
		const { data } = await axios.get<GamesApi>(`${callApi}&page=${i}`);
		gamesResultApi.push(...data.results);
		if (!data.next) break;
	}

	const parsedGames: Array<ParsedGame> = gamesResultApi.map((game) => {
		return {
			id: game.id,
			rating: game.rating,
			name: game.name,
			isDataBase: false,
			image: game.background_image,
			genres: game.genres.map((genreProp) => {
				return { id: genreProp.id, name: genreProp.name };
			}),
			platforms: game.platforms.map((platformProp) => {
				return { id: platformProp.platform.id, name: platformProp.platform.name };
			}),
			released: game.released,
		};
	});

	return parsedGames;
}
