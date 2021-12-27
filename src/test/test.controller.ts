import { Controller, Get } from "@nestjs/common";
import { TestService } from "./test.service";

@Controller()
export class TestController {
  constructor(private readonly testService: TestService) {
  }

  @Get("/test")
  async getAnswerForTest(): Promise<{ testAnswer : string[] }> {
    let testAnswer = await this.testService.getAnswerForTest();
    return {
        testAnswer : testAnswer.map(  record => record.name )
    }
  }
}