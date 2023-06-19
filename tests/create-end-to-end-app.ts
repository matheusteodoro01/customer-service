import { AllExceptionsFilter } from '@/infra/common';
import { AppModule } from '@/main/modules/app.module';
import { Logger } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { Test, TestingModule } from '@nestjs/testing';

export const createEndToEndApp = async () => {
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();

  const app = moduleFixture.createNestApplication<NestFastifyApplication>(
    new FastifyAdapter(),
  );
  const httpAdapter = app.get(HttpAdapterHost);
  const logger = new Logger();
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter, logger));
  await app.init();
  await app.getHttpAdapter().getInstance().ready();
  return app;
};
