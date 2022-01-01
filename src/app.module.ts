import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import config from '@app/ormconfig';
import { UserModule } from '@app/user/user.module';
import { AuthMiddleware } from '@app/middlewares/auth.middleware';

@Module({
  imports: [TypeOrmModule.forRoot(config), UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(
      {
        path: '*',
        method: RequestMethod.ALL
      }
    );
  }
}