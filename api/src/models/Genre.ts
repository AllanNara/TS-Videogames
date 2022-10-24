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

  @ManyToMany((type) => Videogame, (videogame) => videogame.genres)
  videogames: Array<Videogame>;
}
