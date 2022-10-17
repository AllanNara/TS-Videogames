import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("videogames")
export class Videogame extends BaseEntity {
  
  @PrimaryGeneratedColumn("uuid")
  id: number

  @Column({unique: true})
  name: string

  @Column()
  description: string

  @Column("date")
  released: string

  @Column("float")
  rating: number

  @Column()
  isDataBase: boolean

  @Column("text")
  image: string

  
}