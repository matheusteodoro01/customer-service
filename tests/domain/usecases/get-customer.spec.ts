import { GetCustomerByIdUseCase } from '@/domain/usecases';
import { makeCustomer } from '@/tests/mocks/customer';
import { NotFoundError } from '@/domain/errors';
import { customerRepositoryStub } from '@/tests/mocks/infra/respositories';

const makeSut = () => {
  const sut = new GetCustomerByIdUseCase(customerRepositoryStub);
  return { sut, customerRepositoryStub };
};

const makeInput = (): { id: string } => ({
  id: 'customer:bdbb033d-72ca-49de-bc8c-e7628cd5a5ea',
});

describe('GetCustomerByIdUseCase', () => {
  it('should call CustomerRepository with correct values', async () => {
    const { sut, customerRepositoryStub } = makeSut();
    const customerRepositorySpy = jest.spyOn(customerRepositoryStub, 'getCustomerById');
    await sut.execute(makeInput());
    expect(customerRepositorySpy).toHaveBeenCalledWith(makeInput());
  });

  it('should throws if CustomerRepository returns null', async () => {
    const { sut, customerRepositoryStub } = makeSut();
    jest.spyOn(customerRepositoryStub, 'getCustomerById').mockResolvedValueOnce(null);
    const promise = sut.execute(makeInput());
    await expect(promise).rejects.toThrowError(
      new NotFoundError(`Cliente ID ${makeInput().id} não encontrado`),
    );
  });

  it('should returns a valid customers', async () => {
    const { sut } = makeSut();
    const result = await sut.execute(makeInput());
    expect(result).toEqual(makeCustomer);
  });
});
