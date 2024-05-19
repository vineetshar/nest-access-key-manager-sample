import { NestFactory } from '@nestjs/core';
import { TokenInformationModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(TokenInformationModule);
  await app.listen(3000);
}
bootstrap();
