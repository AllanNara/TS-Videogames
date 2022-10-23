import {
  BaseEntity,
  Column,
  Entity,
  PrimaryColumn,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { Videogame } from "./Videogame";

@Entity("genres")
export class Genre extends BaseEntity {
  @PrimaryColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @ManyToMany((type) => Videogame)
  @JoinTable({
    name: "game_genres",
    joinColumn: {
      name: "genreId",
      referencedColumnName: "id",
    },
    inverseJoinColumn: {
      name: "videogameId",
      referencedColumnName: "id",
    },
  })
  videogame: Array<Videogame>;
}
