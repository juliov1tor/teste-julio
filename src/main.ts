import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ClassSerializerInterceptor } from '@nestjs/common';
import { Reflector } from '@nestjs/core';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  await app.listen(process.env.PORT || 3000, '0.0.0.0');
  console.log('Aplicação iniciada na porta', process.env.PORT || 3000);
  app.useGlobalInterceptors(
  new ClassSerializerInterceptor(app.get(Reflector)),
  );
}
bootstrap();
