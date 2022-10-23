import { AllDetailGame, VideogamesResults } from "../../types";

export class Game implements VideogamesResults {
  public id: number;
  public rating: number;
  public name: string;
  public isDataBase: boolean;
  public image: string;
  public genres: Array<string>;
  public platforms: Array<string>;

  constructor(
    id: number,
    name: string,
    image: string,
    genres: Array<string>,
    platforms: Array<string>,
    rating = 0,
    isDataBase = false
  ) {
    this.id = id;
    this.rating = rating;
    this.name = name;
    this.isDataBase = isDataBase;
    this.image = image;
    this.genres = genres;
    this.platforms = platforms;
  }
}

export class GameDetail extends Game implements AllDetailGame {
  public description: string;
  public released: string;

  constructor(
    id: number,
    name: string,
    image: string,
    genres: Array<string>,
    platforms: Array<string>,
    description: string,
    released: string,
    rating = 0,
    isDataBase = false
  ) {
    super(id, name, image, genres, platforms, rating, isDataBase);
    this.description = description;
    this.released = released;
  }
}
