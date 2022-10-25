import { AllDetailGame, GameDetailApi, NormalEntity } from "../../types";
import axios from "axios";
import { GameDetail } from "../utils/classGame";
import { CustomError } from "../utils/customError";

const { API_KEY } = process.env;

export async function gameDetailApi(id: string): Promise<AllDetailGame> {
  try {
    let game: AllDetailGame;
    const find = await axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`);
    
    const found: GameDetailApi = find.data;
    
    let genresGame: Array<NormalEntity> = 
    found.genres.map(gnr => {
      return { name: gnr.name, id: gnr.id }
    });
    let platformsGame: Array<NormalEntity> = 
    found.platforms.map(plt => {
      return { name: plt.platform.name, id: plt.platform.id }
    });
    
    game = new GameDetail(
      found.id,
      found.name,
      found.background_image,
      genresGame,
      platformsGame,
      found.description_raw,
      found.released,
      found.rating
    );
  
    return game;
  } catch (error) {
    if(axios.isAxiosError(error)) {
      throw new CustomError(error.response?.statusText as string, error.response?.status, {axiosError: error.code})
    } else {
      throw new CustomError("NOT FOUND", 404, `Game with ID(${id}) not found in API`)
    }
  }
}
