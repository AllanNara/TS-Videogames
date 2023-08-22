import {
	BaseEntity,
	Column,
	Entity,
	PrimaryGeneratedColumn,
	ManyToMany,
	JoinTable,
} from "typeorm";
import { Min, Max } from "class-validator";
import Genre from "./Genre";
import Platform from "./Platform";

@Entity("videogames")
export default class Videogame extends BaseEntity {
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@Column("float", { default: 0, nullable: true })
	@Max(5)
	@Min(0)
	rating: number;

	@Column({ unique: true })
	name: string;

	@Column("boolean", { default: true })
	isDataBase: boolean;

	@Column("text", { nullable: true })
	image: string;

	@ManyToMany((type) => Genre, (genre) => genre.videogames)
	@JoinTable({
		name: "game_genres",
		joinColumn: {
			name: "videogameId",
		},
		inverseJoinColumn: {
			name: "genreId",
		},
	})
	genres: Array<Genre>;

	@ManyToMany((type) => Platform, (platform) => platform.videogames)
	@JoinTable({
		name: "game_platforms",
		joinColumn: {
			name: "videogameId",
		},
		inverseJoinColumn: {
			name: "platformId",
		},
	})
	platforms: Array<Platform>;

	@Column({ length: 40, unique: true })
	description: string;

	@Column("date", { default: new Date().toISOString().split("T")[0], nullable: true })
	released: Date;
}
