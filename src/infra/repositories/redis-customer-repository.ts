import { v4 as uuidv4 } from 'uuid';
import  Redis from 'ioredis';
import { Customer } from '@/domain/models';
import { CustomerRepository } from '@/domain/repositories';
import { CacheNotAvailableError } from '@/domain/errors';

export class RedisCustomerRepository implements CustomerRepository {
  constructor(private readonly client: Redis) {}

  async saveCustomer(input: Omit<Customer, 'id'>): Promise<Customer> {
    try {
      const id = this.makeCustomerKey(uuidv4());
      const customer: Customer = { id, ...input };
      await this.client.set(id, JSON.stringify(customer));
      return customer;
    } catch (error) {
      throw new CacheNotAvailableError('Cache indisponível');
    }
  }

  async updateCustomer(input: Customer): Promise<Customer> {
    try {
      const id = input.id;
      await this.client.set(id, JSON.stringify(input));
      return input;
    } catch (error) {
      throw new CacheNotAvailableError('Cache indisponível');
    }
  }

  async getCustomerById({ id }: { id: string }): Promise<Customer | null> {
    try {
      const customer = await this.client.get(id);
      return customer ? JSON.parse(customer) : null;
    } catch (error) {
      throw new CacheNotAvailableError('Cache indisponível');
    }
  }

  private makeCustomerKey(id: string): string {
    return `customer:${id}`;
  }
}
