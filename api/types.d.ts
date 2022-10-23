export interface InterfaceCustomError {
  message: string;
  status: number;
  additionalInfo: any;
};

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

export type gamesApi = {
  id: number;
  name: string;
  background_image: string;
  rating: number;
  platforms: Array<{ platform: { id: number; name: string } }>;
  genres: Array<{ id: number; name: string }>;
};

export interface VideogamesResults {
  id: number;
  rating: number;
  name: string;
  isDataBase?: boolean;
  image: string;
  genres: Array<string>;
  platforms: Array<string>;
};