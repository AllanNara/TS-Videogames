import { GamesApi, NormalEntity, VideogamesResults } from "../../types/types";
import axios from "axios";
import { Game } from "../utils/classGame";

const { API_KEY } = process.env

export async function getGamesApi(name: string | undefined): Promise<Array<VideogamesResults>> {
  // CONTAINER WITH ALL RESULTS (DATABASE AND API)
  let result: Array<VideogamesResults> = [];

  const callApi: string = Boolean(name)
    ? `https://api.rawg.io/api/games?search=${name}&page_size=40&key=${API_KEY}`
    : `https://api.rawg.io/api/games?page_size=40&key=${API_KEY}`;
  
  // VARIABLE FOR RESULTS FROM API
  let promisesResultApi: Array<GamesApi> = [];
  if(!Boolean(name)) {
    const nexts = axios.get(`${callApi}&page=1`);
    const nexts1 = axios.get(`${callApi}&page=2`);
    const nexts2 = axios.get(`${callApi}&page=3`);
    // RESOLVE PROMISES
    await Promise.all([nexts, nexts1, nexts2])
      .then((response) => {
        promisesResultApi.push(
          ...response[0].data.results, 
          ...response[1].data.results, 
          ...response[2].data.results
        );
      })
  } else { // CASE EXIST NAME QUERY
    for(let i = 1; i <= 3; i++) {
      const response = await axios.get(`${callApi}&page=${i}`);
      promisesResultApi.push(...response.data.results);
      if(!response.data.next) break;
    }; 
  };
  // MAP ALL GAMES FROM API IN VARIABLE RESULT
  promisesResultApi.forEach((data): void => {
    let platforms: Array<NormalEntity> = 
    data.platforms.map((pl) => {
      return {name: pl.platform.name, id: pl.platform.id}
    });
    let genres: Array<NormalEntity> = 
    data.genres.map((gr) => {
      return {name: gr.name, id: gr.id}
    });
    let game = new Game(
      data.id,
      data.name,
      data.background_image,
      genres,
      platforms,
      data.rating
    );
    result.push(game);
  });

  return result
}