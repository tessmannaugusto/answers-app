
import { AppDataSource } from "../../data-source.js";
import { Answer } from "../entity/answer.entity.js";


export const AnswerRepository = AppDataSource.getRepository(Answer);