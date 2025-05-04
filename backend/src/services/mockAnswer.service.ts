import { Repository } from "typeorm";

interface MockAnswer {
  statusCode: number;
  response: object;
}


export class MockAnswerService {
  private repository;

  constructor(repository: Repository<any>) {
    this.repository = repository;
  }

  async getAnswerInfo(answerId: number): Promise<MockAnswer | undefined> {
    try {
      const answer = await this.repository.findOne({ where: { id: answerId } });
      if (!answer) {
        throw new Error(`Answer with ID ${answerId} not found`);
      }
      return {
        statusCode: answer.statusCode,
        response: JSON.parse(answer.response)
      }
    } catch(error) {
      console.error(`Error fetching answer with ID ${answerId}: ${error}`);
      throw error;
    }
  }

}