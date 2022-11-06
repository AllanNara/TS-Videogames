import axios from "axios";
import { Genre } from "../models";
import { AxiosResults } from "../../types/types";
const { API_KEY } = process.env;

export async function addGenres(): Promise<void> {
  try {
    const findGenres = await Genre.find();
    if(!Boolean(findGenres.length)) {
      const genresApi = await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`);
      const genres: Array<AxiosResults> = genresApi.data.results;
      const promises: Array<Promise<Genre>> = genres.map(genre => {
        let addGenre = new Genre();
        addGenre.id = genre.id;
        addGenre.name = genre.name;
        return addGenre.save();
      });
      await Promise.all(promises);
      console.log('Genred added');
    } else {
      console.log("Genres alredy charged")
    }
  } catch (error) {
    if(error instanceof Error) {
      console.log({ErrorMsg: error.message})
    } else {
      console.log(error)
    }
  }
}
