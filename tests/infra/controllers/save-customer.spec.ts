import { infra } from '@/infra/common';
import { CustomerRepositoriesModule } from '@/main/modules/customer-repositories.module';
import { createEndToEndApp } from '@/tests/create-end-to-end-app';
import { mockAxios, mockJsonWebToken } from '@/tests/mocks';
import { NestFastifyApplication } from '@nestjs/platform-fastify';
import request from 'supertest';

const makeCreateCustomerRequest = () => ({
  name: 'any_name',
  document: 2233344422,
});

describe('Save customer controller', () => {
  let app: NestFastifyApplication;
  beforeEach(async () => {
    jest.mock('ioredis', () => {
      const ioredisMock = require('ioredis-mock');
      return ioredisMock;
    });
    app = await createEndToEndApp();
  });

  afterEach(async () => {
    app
      .select(CustomerRepositoriesModule)
      .get(infra.providers.redis)
      .disconnect();
    await app.close();
    jest.clearAllMocks();
  });

  it('should return 502 if SSO not available', async () => {
    mockAxios(null, 500);
    const { status, body } = await request(app.getHttpServer())
      .post('/customer')
      .send(makeCreateCustomerRequest());
    expect(status).toBe(502);
    expect(body).toEqual({
      message: expect.any(String),
    });
  });

  it('should return 502 if cache not available', async () => {
    mockAxios();
    mockJsonWebToken(true);

    const ioredis = app
      .select(CustomerRepositoriesModule)
      .get(infra.providers.redis);
    jest.spyOn(ioredis, 'set').mockRejectedValueOnce(new Error(''));

    const { status, body } = await request(app.getHttpServer())
      .post('/customer')
      .send(makeCreateCustomerRequest());
    expect(status).toBe(502);
    expect(body).toEqual({
      message: expect.any(String),
    });
  });

  it('should return 401 if token is not provided', async () => {
    mockAxios();
    mockJsonWebToken(false);
    const { status, body } = await request(app.getHttpServer())
      .post('/customer')
      .send(makeCreateCustomerRequest());
    expect(status).toBe(401);
    expect(body).toEqual({
      message: expect.any(String),
    });
  });

  it('should return 400 if payload is not valid', async () => {
    mockAxios();
    mockJsonWebToken(true);
    const { status, body } = await request(app.getHttpServer())
      .post('/customer')
      .send({});
    expect(status).toBe(400);
    expect(body).toEqual({
      message: expect.any(String),
    });
  });

  it('should return 201 on success create customer', async () => {
    mockAxios();
    mockJsonWebToken(true);
    const { status, body } = await request(app.getHttpServer())
      .post('/customer')
      .send(makeCreateCustomerRequest());
    expect(status).toBe(201);
    expect(body).toEqual({
      id: expect.any(String),
      ...makeCreateCustomerRequest(),
    });
  });
});
