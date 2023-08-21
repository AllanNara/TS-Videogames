// Generated by https://quicktype.io

export default interface GenresApi {
	count: number;
	next: null;
	previous: null;
	results: Result[];
}

interface Result {
	id: number;
	name: string;
	slug: string;
	games_count: number;
	image_background: string;
	games: Game[];
}

interface Game {
	id: number;
	slug: string;
	name: string;
	added: number;
}
