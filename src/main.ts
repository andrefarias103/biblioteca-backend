import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerDocumentOptions, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Sistema de Biblioteca')
    .setDescription('Descrição da Api da Biblioteca')
    .setVersion('1.0')
    .addTag('biblioteca')
    .build();

  const options: SwaggerDocumentOptions =  {
    operationIdFactory: (
      controllerKey: string,
      methodKey: string
    ) => methodKey
  };

  const document = SwaggerModule.createDocument(app, config, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(3010);
}
bootstrap();
