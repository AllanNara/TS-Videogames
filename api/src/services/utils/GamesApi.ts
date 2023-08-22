import axios from "axios";
import GamesApi, { Result } from "../../interfaces/games_api";

const { API_KEY } = process.env;

export async function getGamesApi(name?: string) {
	const callApi = !name
		? `https://api.rawg.io/api/games?search=${name}&page_size=40&key=${API_KEY}`
		: `https://api.rawg.io/api/games?page_size=40&key=${API_KEY}`;

	// VARIABLE FOR RESULTS FROM API
	const promisesResultApi: Result[] = [];
	for (let i = 1; i <= 3; i++) {
		const { data } = await axios.get<GamesApi>(`${callApi}&page=${i}`);
		promisesResultApi.push(...data.results);
		if (!data.next) break;
	}

	return promisesResultApi;
}
