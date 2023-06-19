import { SaveCustomerUseCase } from '@/domain/usecases';
import { makeCustomer } from '@/tests/mocks/customer';
import { Customer } from '@/domain/models';
import { customerRepositoryStub } from '@/tests/mocks/infra/respositories';

const makeSut = () => {
  const sut = new SaveCustomerUseCase(customerRepositoryStub);
  return { sut, customerRepositoryStub };
};

const makeInput = (): Omit<Customer, 'id'> => ({
  name: 'any_name',
  document: 2233344422,
});

describe('CreateCustomerUseCase', () => {
  it('should call CustomerRepository with correct values', async () => {
    const { sut, customerRepositoryStub } = makeSut();
    const customerRepositorySpy = jest.spyOn(customerRepositoryStub, 'saveCustomer');
    await sut.execute(makeInput());
    expect(customerRepositorySpy).toHaveBeenCalledWith(makeInput());
  });

  it('should returns a valid customers', async () => {
    const { sut } = makeSut();
    const result = await sut.execute(makeInput());
    expect(result).toEqual(makeCustomer);
  });
});
