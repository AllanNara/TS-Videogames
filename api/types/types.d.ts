import { Genre, Platform } from "../src/models";

export interface InterfaceCustomError {
  message: string;
  status: number;
  additionalInfo: any;
}

export type NormalEntity = {
  id: number;
  name: string;
};

export interface AxiosResults extends NormalEntity {
  image_background: string;
  games: Array<NormalEntity>;
}

export type DataAxios = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Array<AxiosResults>;
};

export type ResponseAxios = {
  data: DataAxios;
};

export type GamesApi = {
  id: number;
  name: string;
  background_image: string;
  rating: number;
  platforms: Array<{ platform: { id: number; name: string } }>;
  genres: Array<{ id: number; name: string }>;
};

export type GameDetailApi = GamesApi & {
  description_raw: string;
  released: string;
};

export interface VideogamesResults {
  id: number | string;
  rating: number;
  name: string;
  isDataBase?: boolean;
  image: string;
  genres: Array<NormalEntity> | Array<Genre>;
  platforms: Array<NormalEntity> | Array<Platform>;
}

export interface AllDetailGame extends VideogamesResults {
  description: string;
  released: string | Date;
}

type DataBase = {
  user: string,
  password: string,
  database: string,
  host: string,
  dialect: string
}

interface Enviroment {
  PORT: number,
  DB: DataBase
}