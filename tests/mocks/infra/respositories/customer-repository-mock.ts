import { CustomerRepository } from '@/domain/repositories';
import { mock } from 'jest-mock-extended';
import { makeCustomer } from '@/tests/mocks/customer';

export const customerRepositoryStub = mock<CustomerRepository>({
  saveCustomer: () => Promise.resolve(makeCustomer),
  updateCustomer: () => Promise.resolve(makeCustomer),
  getCustomerById: () => Promise.resolve(makeCustomer),
});
