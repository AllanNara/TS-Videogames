import axios from "axios";
import CustomError from "../../utils/customError";
import GameDetailsApi from "../../interfaces/game_details_api";
import config from "../../../config/environments";

export async function getGameDetailsApi(id: string): Promise<GameDetailsApi | null> {
	try {
		const { data } = await axios.get<GameDetailsApi>(
			`https://api.rawg.io/api/games/${id}?key=${config.API_KEY}`
		);
		return data;
	} catch (error) {
		if (axios.isAxiosError(error) && error.response?.status === 404) {
			return null;
		} else if (axios.isAxiosError(error)) {
			throw new CustomError(error.response?.statusText, error.response?.status);
		} else throw new CustomError();
	}
}
