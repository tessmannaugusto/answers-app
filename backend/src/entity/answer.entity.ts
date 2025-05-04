import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

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
}