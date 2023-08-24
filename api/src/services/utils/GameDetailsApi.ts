import axios from "axios";
import CustomError from "../../utils/customError";
import GameDetailsApi from "../../interfaces/game_details_api";
import config from "../../../config/environments";
import ParsedGame from "../../interfaces/game_dto";

export async function getGameDetailsApi(id: string): Promise<ParsedGame | null> {
	try {
		const { data: game } = await axios.get<GameDetailsApi>(
			`https://api.rawg.io/api/games/${id}?key=${config.API_KEY}`
		);
		const parsedGame: ParsedGame = {
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
			description: game.description_raw,
		};
		return parsedGame;
	} catch (error) {
		if (axios.isAxiosError(error) && error.response?.status === 404) {
			return null;
		} else if (axios.isAxiosError(error)) {
			throw new CustomError(error.response?.statusText, error.response?.status);
		} else throw new CustomError();
	}
}
