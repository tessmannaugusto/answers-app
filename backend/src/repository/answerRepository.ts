
import { AppDataSource } from "../../data-source.js";
import { Answer } from "../entity/answer.js";


export const AnswerRepository = AppDataSource.getRepository(Answer).extend({
  create(method: string, response: string) {
    return this.create({ method, response  });
  },

  find(answersId: number) {
    return this.find({ where: { id: answersId } });
  },

  update(answersId: number, method: string, response: string) {
    return this.update({ id: answersId }, { method, response });
  },

  delete(answersId: number) {
    return this.delete({ id: answersId });
  }
});