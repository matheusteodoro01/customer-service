import RedisMock from 'ioredis-mock';
import { Customer } from '@/domain/models';
import { CacheNotAvailableError } from '@/domain/errors';
import { RedisCustomerRepository } from '@/infra/repositories';
import Redis from 'ioredis';

describe('RedisCustomerRepository', () => {
  let redisClient: Redis;
  let sut: RedisCustomerRepository;

  beforeEach(() => {
    redisClient = new RedisMock();
    sut = new RedisCustomerRepository(redisClient);
  });

  afterEach(() => {
    redisClient.flushall();
  });

  describe('saveCustomer', () => {
    it('should save a new customer and return the saved customer', async () => {
      const input: Omit<Customer, 'id'> = {
        name: 'John Doe',
        document: 1234567890,
      };
      const result = await sut.saveCustomer(input);
      expect(result.document).toBe(input.document);
      expect(result.name).toBe(input.name);
    });

    it('should throw CacheNotAvailableError when an error occurs during saving', async () => {
      const input: Omit<Customer, 'id'> = {
        name: 'John Doe',
        document: 1234567890,
      };
      jest.spyOn(redisClient, 'set').mockRejectedValueOnce(new Error());

      await expect(sut.saveCustomer(input)).rejects.toThrow(
        CacheNotAvailableError,
      );
    });
  });

  describe('updateCustomer', () => {
    it('should update an existing customer and return the updated customer', async () => {
      const customer: Customer = {
        id: 'test-id',
        name: 'John Doe',
        document: 1234567890,
      };

      const result = await sut.updateCustomer(customer);
      expect(result).toEqual(customer);
    });

    it('should throw CacheNotAvailableError when an error occurs during updating', async () => {
      const customer: Customer = {
        id: 'test-id',
        name: 'John Doe',
        document: 1234567890,
      };
      jest.spyOn(redisClient, 'set').mockRejectedValueOnce(new Error());

      await expect(sut.updateCustomer(customer)).rejects.toThrow(
        CacheNotAvailableError,
      );
    });
  });

  describe('getCustomerById', () => {
    it('should return the customer with the given ID', async () => {
      const id = 'test-id';
      const customer: Customer = { id, name: 'John Doe', document: 1234567890 };
      redisClient.set(id, JSON.stringify(customer));

      const result = await sut.getCustomerById({ id });
      expect(result).toEqual(customer);
    });

    it('should return null when the customer does not exist', async () => {
      const id = 'nonexistent-id';

      const result = await sut.getCustomerById({ id });

      expect(result).toBeNull();
    });

    it('should throw CacheNotAvailableError when an error occurs during retrieval', async () => {
      jest.spyOn(redisClient, 'get').mockRejectedValueOnce(new Error());

      await expect(sut.getCustomerById({ id: 'test-id' })).rejects.toThrow(
        CacheNotAvailableError,
      );
    });
  });
});
