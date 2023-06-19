import { Customer } from '@/domain/models';

export interface CustomerRepository {
  saveCustomer(input: Omit<Customer, 'id'>): Promise<Customer>;
  updateCustomer(input: Customer): Promise<Customer>;
  getCustomerById({ id }: { id: string }): Promise<Customer | null>;
}
