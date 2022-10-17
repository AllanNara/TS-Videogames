import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("genres")
export class Genre extends BaseEntity {
  
  @PrimaryGeneratedColumn()
  id: number

  @Column({unique: true})
  name: string

}