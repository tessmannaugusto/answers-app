import "reflect-metadata";
import { DataSource } from "typeorm";
import { Answer } from "./src/entity/answer.entity.js";


export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.PGHOST,
  port: 5432,
  username: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
  synchronize: true,
  logging: true,
  logger: "advanced-console",
  ssl: true,
  entities: [Answer],
  migrations: ["src/migration/**/*.ts"],
  subscribers: ["src/subscriber/**/*.ts"],
});
