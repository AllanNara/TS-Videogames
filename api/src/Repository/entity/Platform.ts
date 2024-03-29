import { BaseEntity, Column, Entity, PrimaryColumn, ManyToMany } from "typeorm";
import Videogame from "./Videogame";

@Entity("platforms")
export default class Platform extends BaseEntity {
	@PrimaryColumn()
	id: number;

	@Column({ unique: true })
	name: string;

	@ManyToMany((type) => Videogame, (videogame) => videogame.platforms)
	videogames: Array<Videogame>;
}
