import ParsedGame from "../interfaces/game_dto";

export default class VideogameDto implements ParsedGame {
	public id;
	public rating;
	public name;
	public isDataBase;
	public image;
	public genres;
	public platforms;
	public released;
	constructor({
		id,
		rating,
		name,
		isDataBase,
		image,
		genres,
		platforms,
		released,
	}: ParsedGame) {
		this.id = id;
		this.rating = rating;
		this.name = name;
		this.isDataBase = isDataBase;
		this.image = image;
		this.genres = genres;
		this.platforms = platforms;
		this.released = released;
	}
}
