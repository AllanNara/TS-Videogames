import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { Min, Max } from "class-validator";
import { Genre } from "./Genre";
import { Platform } from "./Platform";

@Entity("videogames")
export class Videogame extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: number;

  @Column({ unique: true })
  name: string;

  @Column({ length: 40, unique: true })
  description: string;

  @Column("date", { default: new Date().toISOString().split("T")[0], nullable: true })
  released: Date;

  @Column("float", { default: 0, nullable: true })
  @Max(5)
  @Min(0)
  rating: number;

  @Column("boolean", { default: true })
  isDataBase: boolean;

  @Column("text")
  image: string;

  @ManyToMany((type) => Genre)
  @JoinTable({
    name: "game_genres",
    joinColumn: {
      name: "videogameId",
      referencedColumnName: "id",
    },
    inverseJoinColumn: {
      name: "genreId",
      referencedColumnName: "id",
    },
  })
  genre: Array<Genre>;

  @ManyToMany((type) => Platform)
  @JoinTable({
    name: "game_platforms",
    joinColumn: {
      name: "videogameId",
      referencedColumnName: "id",
    },
    inverseJoinColumn: {
      name: "platformId",
      referencedColumnName: "id",
    },
  })
  platform: Array<Platform>;
}
