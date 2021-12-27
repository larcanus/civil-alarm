import { Module } from "@nestjs/common";
import { TestController } from "@app/test/test.controller";
import { TestService } from "@app/test/test.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TestEntity } from "@app/entity/test.entity";

@Module({
  imports: [TypeOrmModule.forFeature([TestEntity])],
  controllers: [TestController],
  providers: [TestService]
})
export class TestModule {
}