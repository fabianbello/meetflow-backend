import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT || 3000);
  console.log('API Gateway de meetflow corriendo en el puerto: ', process.env.PORT);
}
bootstrap();
