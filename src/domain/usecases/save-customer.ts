import { Customer } from '@/domain/models';
import { CustomerRepository } from '@/domain/repositories';

export class SaveCustomerUseCase {
  constructor(private readonly customerRepository: CustomerRepository) {}

  async execute(CustomerData: Omit<Customer, 'id'>): Promise<Customer> {
    return await this.customerRepository.saveCustomer(CustomerData);
  }
}
