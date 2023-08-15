import { Module, Global } from '@nestjs/common';
import { infra } from '@/infra/common/ioc';
import { z } from 'zod';
import 'dotenv/config';
const envSchema = z.object({
  KEYCLOAK_BASE_URL: z.string(),
  KEYCLOAK_CLIENT: z.string(),
  KEYCLOAK_CLIENT_SECRET: z.string(),
  REDIS_PORT: z.string(),
  REDIS_HOST: z.string(),
  REDIS_USER_NAME: z.string(),
  REDIS_PASSWORD: z.string(),
  REDIS_DB: z.string(),
  ENVIRONMENT: z.string(),
});

@Global()
@Module({})
export class EnvironmentModule {
  static forRoot() {
    const {
      KEYCLOAK_BASE_URL,
      KEYCLOAK_CLIENT,
      KEYCLOAK_CLIENT_SECRET,
      REDIS_PORT,
      REDIS_HOST,
      REDIS_USER_NAME,
      REDIS_PASSWORD,
      REDIS_DB,
    } = envSchema.parse(process.env);

    return {
      module: EnvironmentModule,
      providers: [
        {
          provide: infra.environment.keycloakBaseUrl,
          useValue: KEYCLOAK_BASE_URL,
        },
        {
          provide: infra.environment.keycloakClient,
          useValue: KEYCLOAK_CLIENT,
        },
        {
          provide: infra.environment.keycloakClientSecret,
          useValue: KEYCLOAK_CLIENT_SECRET,
        },
        {
          provide: infra.environment.redisPort,
          useValue: REDIS_PORT,
        },
        {
          provide: infra.environment.redisHost,
          useValue: REDIS_HOST,
        },
        {
          provide: infra.environment.redisUsername,
          useValue: REDIS_USER_NAME,
        },
        {
          provide: infra.environment.redisPassword,
          useValue: REDIS_PASSWORD,
        },
        {
          provide: infra.environment.redisDb,
          useValue: REDIS_DB,
        },
      ],
      exports: [
        infra.environment.keycloakBaseUrl,
        infra.environment.keycloakClient,
        infra.environment.keycloakClientSecret,
        infra.environment.redisPort,
        infra.environment.redisHost,
        infra.environment.redisUsername,
        infra.environment.redisPassword,
        infra.environment.redisDb,
      ],
    };
  }
}
