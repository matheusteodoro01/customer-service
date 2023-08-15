export const infra = {
  environment: {
    keycloakClient: Symbol.for('KeycloakClient'),
    keycloakClientSecret: Symbol.for('KeycloakClientSecret'),
    keycloakBaseUrl: Symbol.for('KeycloakBaseUrl'),
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
