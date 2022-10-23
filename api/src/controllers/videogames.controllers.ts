import { Request as Req, Response as Res, NextFunction as Next } from "express";
import axios from "axios";
import { Videogame } from "../models";
import { VideogamesResults, gamesApi } from "../../types";
import { Game } from "../utils/classGame";

const { API_KEY } = process.env;

export const allVideogames = async (req: Req, res: Res, next: Next): Promise<any> => {
  const { name } = req.query;
  try {
    // CONTAINER WITH ALL RESULTS (DATABASE AND API)
    let result: Array<VideogamesResults> = [];

    const callApi: string = Boolean(name)
      ? `https://api.rawg.io/api/games?search=${name}&page_size=40&key=${API_KEY}`
      : `https://api.rawg.io/api/games?page_size=40&key=${API_KEY}`;
    
    // VARIABLE FOR RESULTS FROM API
    let promisesResultApi: Array<gamesApi> = [];
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
      let platforms: Array<string> = data.platforms.map(
        (pl) => pl.platform.name
      );
      let genres: Array<string> = data.genres.map((gr) => gr.name);
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

    // ORDER RESULTS BY RATING
    result.sort((a, b) => {
      return b.rating - a.rating;
    });
    // SEND DATA
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
