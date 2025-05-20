import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { User } from "./user.entity.js";

enum MethodType {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE"
}

@Entity( { name: "Answer"})
export class Answer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "enum", enum: MethodType, nullable: false })
  method: string;

  @Column({ type: "varchar" })
  response: string;

  @Column({ type: "integer", nullable: false })
  statusCode: number;

  @ManyToOne(() => User, (user) => user.answers, { onDelete: "CASCADE" })
  @JoinColumn({ name: "userId" })
  user: User;

  @Column()
  userId: number;
}