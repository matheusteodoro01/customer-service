import { UpdateCustomerUseCase } from '@/domain/usecases';
import { Customer } from '@/domain/models';
import { NotFoundError } from '@/domain/errors';
import { customerRepositoryStub } from '@/tests/mocks/infra/respositories';

const makeSut = () => {
  const sut = new UpdateCustomerUseCase(customerRepositoryStub);
  return { sut, customerRepositoryStub };
};

const makeInput = (): Customer => ({
  id: 'any_id',
  name: 'any_name',
  document: 2233344422,
});

describe('UpdateCustomerUseCase', () => {
  it('should call CustomerRepository with correct values', async () => {
    const { sut, customerRepositoryStub } = makeSut();
    const customerRepositorySpy = jest.spyOn(
      customerRepositoryStub,
      'updateCustomer',
    );
    await sut.execute(makeInput());
    expect(customerRepositorySpy).toHaveBeenCalledWith(makeInput());
  });

  it('should throws if CustomerRepository returns null', async () => {
    const { sut, customerRepositoryStub } = makeSut();
    jest
      .spyOn(customerRepositoryStub, 'getCustomerById')
      .mockResolvedValueOnce(null);
    const promise = sut.execute(makeInput());
    await expect(promise).rejects.toThrowError(
      new NotFoundError(`Cliente ID ${makeInput().id} não encontrado`),
    );
  });
});
