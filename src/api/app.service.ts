import { HttpStatus, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import { config } from 'src/config';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from 'src/infrastructure/lib/exeption/all.exeption.filter';

export default class Application {
  public static async main(): Promise<void> {
    const app = await NestFactory.create(AppModule);
 
    app.useGlobalFilters(new AllExceptionsFilter());

    app.use(cookieParser());

    app.enableCors({
      origin: '*',
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      credentials: true,
    });

    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        transform: true,
      }),
    );

    const apiPrefix = 'api/v1';
    app.setGlobalPrefix(apiPrefix);

    const swaggerConfig = new DocumentBuilder()
      .setTitle('Base app')
      .setVersion('1.0')
      .addBearerAuth(
        {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          in: 'header',
        },
        'Bearer',
      )
      .addSecurityRequirements('Bearer')
      .build();

    const document = SwaggerModule.createDocument(app, swaggerConfig);
    SwaggerModule.setup(apiPrefix, app, document);

    await app.listen(config.API_PORT || 3002, () => {
      console.log(`🚀 Server running on port ${config.API_PORT || 3002}`);
    });
  }
}
