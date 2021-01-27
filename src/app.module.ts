import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { generalConfig } from './config';
import { DecodeTokenMiddleware } from './common/middleware/decode-token.middleware';
import { SecurityModule } from "./security/security.module";
import { APP_INTERCEPTOR } from '@nestjs/core';
import { LoggingInterceptor } from './common/loggin.interceptor';
import { ProductModule } from './product/product.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [generalConfig],
    }),
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'postgres',
        host: process.env.DATABASE_HOST,
        port: +process.env.DATABASE_PORT,
        username: 'postgres',
        password: 'postgres',
        database: 'food-ecommerce',
        autoLoadEntities: true,
        synchronize: true,
      }),
    }),
    SecurityModule,
    ProductModule,

  ],
  controllers: [AppController],
  providers: [AppService, {
    provide: APP_INTERCEPTOR,
    useClass: LoggingInterceptor,
  },],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(DecodeTokenMiddleware)
      .forRoutes({ path: '/**', method: RequestMethod.ALL });
  }
}
