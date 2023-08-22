import { BaseEntity, Column, Entity, PrimaryColumn, ManyToMany } from "typeorm";
import Videogame from "./Videogame";

@Entity("genres")
export default class Genre extends BaseEntity {
	@PrimaryColumn()
	id: number;

	@Column({ unique: true })
	name: string;

	@ManyToMany((type) => Videogame, (videogame) => videogame.genres)
	videogames: Array<Videogame>;
}
