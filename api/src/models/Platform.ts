import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("platforms")
export class Platform extends BaseEntity {
  
  @PrimaryGeneratedColumn()
  id: number

  @Column({unique: true})
  name: string

}