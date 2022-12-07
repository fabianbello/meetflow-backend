import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
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

  await app.listen(process.env.PORT || 3000);
  console.log('API Gateway de meetflow corriendo en el puerto: ', process.env.PORT);
}
bootstrap();
