import { Module, Global } from '@nestjs/common';
import { infra } from '@/infra/common/ioc';
import { z } from 'zod';
import 'dotenv/config'
const envSchema = z.object({
  KEYCLOAK_CERT_URL: z.string(),
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
      KEYCLOAK_CERT_URL,
      REDIS_PORT,
      REDIS_HOST,
      REDIS_USER_NAME,
      REDIS_PASSWORD,
      REDIS_DB,
      ENVIRONMENT,
    } = envSchema.parse(process.env);



    return {
      module: EnvironmentModule,
      providers: [
        {
          provide: infra.environment.env,
          useValue: ENVIRONMENT,
        },
        {
          provide: infra.environment.keycloakCertUrl,
          useValue: KEYCLOAK_CERT_URL,
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
        infra.environment.env,
        infra.environment.keycloakCertUrl,
        infra.environment.redisPort,
        infra.environment.redisHost,
        infra.environment.redisUsername,
        infra.environment.redisPassword,
        infra.environment.redisDb,
      ],
    };
  }
}
