import { DynamicFieldController } from './dynamic-field.controller';
import { APP_FILTER } from '@nestjs/core';
import { AllExceptionsFilter } from './exception.filter';
import { HttpModule, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { LoggerMiddleware } from './logger.middleware';
import { AppService } from './app.service';
import { HttpService } from '@nestjs/axios';

HttpModule.registerAsync({
  useFactory: () => ({
    timeout: 5000,
    maxRedirects: 5,
  }),
});
@Module({
  imports: [
    HttpModule
  ],
  controllers: [
    DynamicFieldController,
    AppController
  ],
  providers: [
    AppService,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes('');
  }
} { }
