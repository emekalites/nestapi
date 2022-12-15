import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as compression from 'compression';
import { DocumentBuilder, SwaggerCustomOptions, SwaggerModule } from '@nestjs/swagger';
import 'reflect-metadata';
import { ConfigService } from '@nestjs/config';

const options: SwaggerCustomOptions = {
  swaggerOptions: {
    persistAuthorization: true,
    ignoreGlobalPrefix: true,
  },
};

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const configService = app.get(ConfigService);

  const config = new DocumentBuilder()
    .setTitle('Backend API')
    .setDescription('Backend API')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document, options);

  app.use(compression());

  const corsOption = {
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 200,
  };
  app.enableCors(corsOption);

  const port = +configService.get('PORT');

  await app.listen(port, async () => {
    console.info(`Backend API running on: ${await app.getUrl()}`);
  });
}
bootstrap();
