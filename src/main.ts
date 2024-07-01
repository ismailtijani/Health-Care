import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import {
  DocumentBuilder,
  SwaggerDocumentOptions,
  SwaggerModule,
} from '@nestjs/swagger';

// Get ConfigService Instance
// const configService = app.get(ConfigService);
const configService = new ConfigService();
const PORT = configService.get<number>('PORT') as number;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // const serviceName = 'healthcare';
  // app.setGlobalPrefix(`/api/${serviceName}`);

  // Setup Global pipe for Validation
  app.useGlobalPipes(new ValidationPipe());

  app.enableCors();

  // Setup Swagger documentation
  const config = new DocumentBuilder()
    .setTitle('HEALTH CARE MANAGEMENT SYSTEM FOR UNIVERSITY OF ILORIN')
    .setDescription('HMS Uni Ilorin API Documentation')
    .setVersion('1.0')
    .build();

  const options: SwaggerDocumentOptions = {
    operationIdFactory: (controllerKey: string, methodKey: string) => methodKey,
  };

  const document = SwaggerModule.createDocument(app, config, options);
  // SwaggerModule.setup(`/api/${serviceName}/documentation`, app, document);
  SwaggerModule.setup('api', app, document);

  await app.listen(PORT, async () =>
    console.log(`Server is running 🚀🚀🚀 on: ${await app.getUrl()}`),
  );
}
bootstrap();
