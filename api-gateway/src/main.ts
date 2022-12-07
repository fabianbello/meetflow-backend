import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionFilter } from './common/filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new AllExceptionFilter());
  await app.listen(process.env.PORT || 3000);
  console.log('API Gateway de meetflow corriendo en el puerto: ', process.env.PORT);
}
bootstrap();
