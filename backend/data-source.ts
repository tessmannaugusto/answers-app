import "reflect-metadata";
import { DataSource } from "typeorm";
import { Answer } from "./src/entity/answer.js";


export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "postgres",
  database: "test",
  synchronize: true,
  logging: true,
  entities: [Answer],
  migrations: ["src/migration/**/*.ts"],
  subscribers: ["src/subscriber/**/*.ts"],
});