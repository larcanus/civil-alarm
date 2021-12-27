import { MiddlewareConsumer, Module, RequestMethod } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import config from "@app/ormconfig";
import { TestModule } from "@app/test/test.module";
import { UserModule } from "@app/user/user.module";
import { AuthMiddleware } from "@app/middlewares/auth.middleware";
import { UserService } from "@app/user/user.service";

@Module({
  imports: [TypeOrmModule.forRoot(config), TestModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(
      {
        path: "*",
        method: RequestMethod.ALL
      }
    );
  }
}
