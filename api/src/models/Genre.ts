import { BaseEntity, Column, Entity, PrimaryColumn } from "typeorm";

@Entity("genres")
export class Genre extends BaseEntity {
  
  @PrimaryColumn()
  id: number

  @Column({unique: true})
  name: string

}