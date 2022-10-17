export type NormalEntity = {
  id: number,
  name: string,
}

export interface AxiosResults extends NormalEntity {
  image_background: string,
  games: Array<NormalEntity>,
}

export type DataAxios = {
  count: number,
  next: string | null,
  previous: string | null,
  results: Array<AxiosResults>
}

export type ResponseAxios = {
  data: DataAxios
}