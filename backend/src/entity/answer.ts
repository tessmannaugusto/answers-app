import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Answer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  method: string;

  @Column()
  response: string;
}