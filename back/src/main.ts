import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
 import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const corsOptions = {
  origin: ['*','http://localhost:5173',],
  methods: 'GET,PUT,POST,DELETE,HEAD',
  preflightContinue: false,
  optionsSuccessStatus: 204,
  credentials: true,
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(corsOptions)
  const options = new DocumentBuilder()
    .setTitle('BookShop')
    .setDescription('BookShop API description')
    .setVersion('1.0')
    .addTag('BookShop')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(8002);
}
bootstrap();
