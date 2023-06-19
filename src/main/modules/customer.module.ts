import { domain } from '@/domain/common/ioc';
import {
  SaveCustomerUseCase,
  GetCustomerByIdUseCase,
  UpdateCustomerUseCase,
} from '@/domain/usecases';
import { infra } from '@/infra/common/ioc';
import { CustomerController } from '@/infra/controlers';
import { Module } from '@nestjs/common';
import { EnvironmentModule } from './environment.module';
import { CustomerRepositoriesModule } from './customer-repositories.module';

@Module({
  imports: [EnvironmentModule.forRoot(), CustomerRepositoriesModule],
  providers: [
    {
      provide: domain.usecases.saveCustomer,
      useFactory: (customerRepository) =>
        new SaveCustomerUseCase(customerRepository),
      inject: [infra.repositories.customerRepository],
    },
    {
      provide: domain.usecases.getCustomer,
      useFactory: (customerRepository) =>
        new GetCustomerByIdUseCase(customerRepository),
      inject: [infra.repositories.customerRepository],
    },
    {
      provide: domain.usecases.updateCustomer,
      useFactory: (customerRepository) =>
        new UpdateCustomerUseCase(customerRepository),
      inject: [infra.repositories.customerRepository],
    },
  ],
  controllers: [CustomerController],
})
export class CustomerModule {}
