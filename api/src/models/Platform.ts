import {
  BaseEntity,
  Column,
  Entity,
  PrimaryColumn,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { Videogame } from "./Videogame";

@Entity("platforms")
export class Platform extends BaseEntity {
  @PrimaryColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @ManyToMany((type) => Videogame)
  @JoinTable({
    name: "game_platforms",
    joinColumn: {
      name: "platformId",
      referencedColumnName: "id",
    },
    inverseJoinColumn: {
      name: "videogameId",
      referencedColumnName: "id",
    },
  })
  videogame: Array<Videogame>;
}
