import { AllExceptionsFilter } from '@/infra/common/http-exception-filter';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from '@/main/modules/app.module';
import { Logger } from '@nestjs/common';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  const httpAdapter = app.get(HttpAdapterHost);
  const logger = new Logger();
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter, logger));

  await app.listen(3000, '0.0.0.0');
}
bootstrap();
