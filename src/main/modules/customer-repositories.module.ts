import { Module } from '@nestjs/common';
import { infra } from '@/infra/common/ioc';
import { RedisCustomerRepository } from '@/infra/repositories';
import Redis from 'ioredis';

@Module({
  providers: [
    {
      provide: infra.providers.redis,
      useFactory: (port, host, username, password, db) =>
        new Redis({ port, host, username, password, db, connectTimeout: 5000 }),
      inject: [
        infra.environment.redisPort,
        infra.environment.redisHost,
        infra.environment.redisUsername,
        infra.environment.redisPassword,
        infra.environment.redisDb,
        infra.environment.env,
      ],
    },
    {
      provide: infra.repositories.customerRepository,
      useFactory: (redisClient) => new RedisCustomerRepository(redisClient),
      inject: [infra.providers.redis],
    },
  ],
  exports: [infra.repositories.customerRepository, infra.providers.redis],
})
export class CustomerRepositoriesModule {}
