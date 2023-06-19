import { infra } from '@/infra/common';
import { CustomerRepositoriesModule } from '@/main/modules/customer-repositories.module';
import { createEndToEndApp } from '@/tests/create-end-to-end-app';
import { makeCustomer, mockAxios, mockJsonWebToken } from '@/tests/mocks';
import { NestFastifyApplication } from '@nestjs/platform-fastify';
import request from 'supertest';

describe('Get customer controller', () => {
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
    const { status, body } = await request(app.getHttpServer()).get(
      '/customer/111',
    );
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
    jest.spyOn(ioredis, 'get').mockRejectedValueOnce(new Error(''));

    const { status, body } = await request(app.getHttpServer()).get(
      '/customer/111',
    );
    expect(status).toBe(502);
    expect(body).toEqual({
      message: expect.any(String),
    });
  });

  it('should return 404 is customer not exist', async () => {
    mockAxios();
    mockJsonWebToken(true);
    const { status, body } = await request(app.getHttpServer()).get(
      '/customer/111',
    );
    expect(status).toBe(404);
    expect(body).toEqual({
      message: expect.any(String),
    });
  });

  it('should return 401 if token is not provided', async () => {
    mockAxios();
    mockJsonWebToken(false);
    const { status, body } = await request(app.getHttpServer()).get(
      '/customer/111',
    );
    expect(status).toBe(401);
    expect(body).toEqual({
      message: expect.any(String),
    });
  });

  it('should return 200 on success get customer', async () => {
    mockAxios();
    mockJsonWebToken(true);
    await app
      .select(CustomerRepositoriesModule)
      .get(infra.providers.redis)
      .set('test_id', JSON.stringify(makeCustomer));

    const { status, body } = await request(app.getHttpServer()).get(
      '/customer/test_id',
    );
    expect(status).toBe(200);
    expect(body).toEqual(makeCustomer);
  });
});
