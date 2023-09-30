import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { AllExceptionFilter } from './common/filters/http-exception.filter';
import { TimeOutInterceptor } from './common/interceptors/timeout.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // manejo de excepciones globales

  app.useGlobalFilters(new AllExceptionFilter());
  // manejo de tiempo maximo de respuesta globales
  app.useGlobalInterceptors(new TimeOutInterceptor());
  // manejo de validaciones a respuestas globales
  app.useGlobalPipes(new ValidationPipe());

  // configuracion de Swagger para documentar API
  const options = new DocumentBuilder()
  .setTitle('API Meetflow')
  .setDescription('Framework para agilizar la creación de aplicaciones que menjan actas dialogicas.')
  .setVersion('1.0')
  .addBearerAuth() // autentication 
  .build();

  const document = SwaggerModule.createDocument(app, options);

  SwaggerModule.setup('/api/docs', app, document,{
    swaggerOptions: {
      filter: true,
    }
  });

  // PERMITE CORS
  app.enableCors();
  await app.listen(3000);
  console.log('API Gateway de meetflow corriendo en el puerto V2: ', 3000);
}
bootstrap();
