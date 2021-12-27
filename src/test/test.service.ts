import { Injectable } from "@nestjs/common";
import { TestEntity } from "@app/entity/test.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class TestService {
  constructor(
    @InjectRepository(TestEntity)
    private readonly testRepository: Repository<TestEntity>
  ) {}

  async getAnswerForTest(): Promise<TestEntity[]> {
    return await this.testRepository.find();
  }
}