import { CustomerRepository } from '@/domain/repositories';
import { Customer } from '@/domain/models';
import { NotFoundError } from '@/domain/errors';

export class GetCustomerByIdUseCase {
  constructor(private readonly CustomerRepository: CustomerRepository) {}

  async execute({ id }: { id: string }): Promise<Customer | null> {
    const customer = await this.CustomerRepository.getCustomerById({ id });

    if (!customer) {
      throw new NotFoundError(`Cliente ID ${id} não encontrado`);
    }

    return customer;
  }
}
