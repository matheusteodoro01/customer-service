import { Module } from '@nestjs/common';
import { CustomerModule } from './customer.module';


@Module({
  imports: [CustomerModule],
})
export class AppModule {}
