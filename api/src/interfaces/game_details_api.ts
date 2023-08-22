export default interface GameDetailsApi {
	id: number;
	slug: string;
	name: string;
	name_original: string;
	description: string;
	metacritic: number;
	metacritic_platforms: any[];
	released: string;
	tba: boolean;
	updated: string;
	background_image: string;
	background_image_additional: string;
	website: string;
	rating: number;
	rating_top: number;
	ratings: Rating[];
	reactions: Reactions;
	added: number;
	added_by_status: AddedByStatus;
	playtime: number;
	screenshots_count: number;
	movies_count: number;
	creators_count: number;
	achievements_count: number;
	parent_achievements_count: number;
	reddit_url: string;
	reddit_name: string;
	reddit_description: string;
	reddit_logo: string;
	reddit_count: number;
	twitch_count: number;
	youtube_count: number;
	reviews_text_count: number;
	ratings_count: number;
	suggestions_count: number;
	alternative_names: any[];
	metacritic_url: string;
	parents_count: number;
	additions_count: number;
	game_series_count: number;
	user_game: null;
	reviews_count: number;
	saturated_color: string;
	dominant_color: string;
	parent_platforms: ParentPlatform[];
	platforms: PlatformElement[];
	stores: Store[];
	developers: Developer[];
	genres: Developer[];
	tags: Developer[];
	publishers: Developer[];
	esrb_rating: null;
	clip: null;
	description_raw: string;
}

interface AddedByStatus {
	yet: number;
	owned: number;
	beaten: number;
	toplay: number;
	dropped: number;
	playing: number;
}

interface Developer {
	id: number;
	name: string;
	slug: string;
	games_count: number;
	image_background: string;
	domain?: string;
	language?: Language;
}

export enum Language {
	Eng = "eng",
}

interface ParentPlatform {
	platform: ParentPlatformPlatform;
}

interface ParentPlatformPlatform {
	id: number;
	name: string;
	slug: string;
}

interface PlatformElement {
	platform: PlatformPlatform;
	released_at: null | string;
	requirements: Requirements;
}

interface PlatformPlatform {
	id: number;
	name: string;
	slug: string;
	image: null;
	year_end: null;
	year_start: null;
	games_count: number;
	image_background: string;
}

interface Requirements {
	minimum?: string;
}

interface Rating {
	id: number;
	title: string;
	count: number;
	percent: number;
}

interface Reactions {
	"8": number;
}

interface Store {
	id: number;
	url: string;
	store: Developer;
}
