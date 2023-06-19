import { CustomerRepository } from '@/domain/repositories';
import { Customer } from '@/domain/models';
import { NotFoundError } from '@/domain/errors';

export class UpdateCustomerUseCase {
  constructor(private readonly CustomerRepository: CustomerRepository) {}

  async execute(customerData: Customer): Promise<Customer> {
    const existingCustomer = await this.CustomerRepository.getCustomerById({
      id: customerData.id,
    });

    if (!existingCustomer) {
      throw new NotFoundError(`Cliente ID ${customerData.id} não encontrado`);
    }

    return await this.CustomerRepository.updateCustomer(customerData);
  }
}
