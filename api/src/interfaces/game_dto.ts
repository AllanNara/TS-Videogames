import GenreDb from "../Repository/entity/Genre";
import PlatformDb from "../Repository/entity/Platform";

export default interface ParsedGame {
	id: number | string;
	rating: number;
	name: string;
	isDataBase: boolean;
	image: string;
	genres: Array<Partial<GenreDb>>;
	platforms: Array<Partial<PlatformDb>>;
	description?: string;
	released: string | Date;
}
