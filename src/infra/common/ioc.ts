export const infra = {
  environment: {
    env: Symbol.for('Environment'),
    keycloakCertUrl: Symbol.for('KeycloakCertUrl'),
    redisPort: Symbol.for('RedisPort'),
    redisHost: Symbol.for('RedisHost'),
    redisUsername: Symbol.for('RedisUserName'),
    redisPassword: Symbol.for('RedisPassword'),
    redisDb: Symbol.for('RedisDb'),
  },
  providers: {
    redis: Symbol.for('RedisClient'),
  },
  repositories: {
    customerRepository: Symbol.for('CustomerRepository'),
  },
};
