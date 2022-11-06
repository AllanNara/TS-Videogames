import { AllDetailGame, NormalEntity, VideogamesResults } from "../../types/types";

export class Game implements VideogamesResults {
  public id: number;
  public rating: number;
  public name: string;
  public isDataBase: boolean;
  public image: string;
  public genres: Array<NormalEntity>;
  public platforms: Array<NormalEntity>;

  constructor(
    id: number,
    name: string,
    image: string,
    genres: Array<NormalEntity>,
    platforms: Array<NormalEntity>,
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
    genres: Array<NormalEntity>,
    platforms: Array<NormalEntity>,
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
