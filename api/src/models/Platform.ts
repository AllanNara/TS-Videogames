import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("platforms")
export class Platform {
  
  @PrimaryGeneratedColumn()
  id: number

  @Column({unique: true})
  name: string

}