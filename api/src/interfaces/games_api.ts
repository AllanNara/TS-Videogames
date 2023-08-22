export default interface GamesApi {
	count: number;
	next: string;
	previous: null;
	results: Result[];
	seo_title: string;
	seo_description: string;
	seo_keywords: string;
	seo_h1: string;
	noindex: boolean;
	nofollow: boolean;
	description: string;
	filters: Filters;
	nofollow_collections: string[];
}

interface Filters {
	years: FiltersYear[];
}

interface FiltersYear {
	from: number;
	to: number;
	filter: string;
	decade: number;
	years: YearYear[];
	nofollow: boolean;
	count: number;
}

interface YearYear {
	year: number;
	count: number;
	nofollow: boolean;
}

export interface Result {
	id: number;
	slug: string;
	name: string;
	released: string;
	tba: boolean;
	background_image: string;
	rating: number;
	rating_top: number;
	ratings: Rating[];
	ratings_count: number;
	reviews_text_count: number;
	added: number;
	added_by_status: AddedByStatus;
	metacritic: number;
	playtime: number;
	suggestions_count: number;
	updated: string;
	user_game: null;
	reviews_count: number;
	saturated_color: Color;
	dominant_color: Color;
	platforms: PlatformElement[];
	parent_platforms: ParentPlatform[];
	genres: Genre[];
	stores: Store[];
	clip: null;
	tags: Genre[];
	esrb_rating: EsrbRating;
	short_screenshots: ShortScreenshot[];
}

interface AddedByStatus {
	yet: number;
	owned: number;
	beaten: number;
	toplay: number;
	dropped: number;
	playing: number;
}

enum Color {
	The0F0F0F = "0f0f0f",
}

interface EsrbRating {
	id: number;
	name: string;
	slug: string;
}

interface Genre {
	id: number;
	name: string;
	slug: string;
	games_count: number;
	image_background: string;
	domain?: Domain;
	language?: Language;
}

enum Domain {
	AppsAppleCOM = "apps.apple.com",
	EpicgamesCOM = "epicgames.com",
	GogCOM = "gog.com",
	MarketplaceXboxCOM = "marketplace.xbox.com",
	MicrosoftCOM = "microsoft.com",
	NintendoCOM = "nintendo.com",
	PlayGoogleCOM = "play.google.com",
	StorePlaystationCOM = "store.playstation.com",
	StoreSteampoweredCOM = "store.steampowered.com",
}

enum Language {
	Eng = "eng",
}

interface ParentPlatform {
	platform: EsrbRating;
}

interface PlatformElement {
	platform: PlatformPlatform;
	released_at: null | string;
	requirements_en: Requirements | null;
	requirements_ru: Requirements | null;
}

interface PlatformPlatform {
	id: number;
	name: string;
	slug: string;
	image: null;
	year_end: null;
	year_start: number | null;
	games_count: number;
	image_background: string;
}

interface Requirements {
	minimum: string;
	recommended?: string;
}

interface Rating {
	id: number;
	title: Title;
	count: number;
	percent: number;
}

enum Title {
	Exceptional = "exceptional",
	Meh = "meh",
	Recommended = "recommended",
	Skip = "skip",
}

interface ShortScreenshot {
	id: number;
	image: string;
}

interface Store {
	id: number;
	store: Genre;
}
