import {
  SaveCustomerUseCase,
  GetCustomerByIdUseCase,
  UpdateCustomerUseCase,
} from '@/domain/usecases';
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Inject,
  Put,
  UseInterceptors,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  saveCustomerDto,
  getCustomerDto,
  updateCustomerDto,
} from '@/infra/dto';
import { domain } from '@/domain/common/ioc';
import { AuthInterceptor } from '../common/auth-interceptor';

@Controller('customer')
@UseInterceptors(AuthInterceptor)
export class CustomerController {
  constructor(
    @Inject(domain.usecases.saveCustomer)
    private readonly creteCustomerUseCase: SaveCustomerUseCase,
    @Inject(domain.usecases.getCustomer)
    private readonly getCustomerUseCase: GetCustomerByIdUseCase,
    @Inject(domain.usecases.updateCustomer)
    private readonly updateCustomerUseCase: UpdateCustomerUseCase,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async save(@Body() data: any) {
    return await this.creteCustomerUseCase.execute(saveCustomerDto.parse(data));
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.getCustomerUseCase.execute(getCustomerDto.parse({ id }));
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() data: any) {
    return await this.updateCustomerUseCase.execute(
      updateCustomerDto.parse({ ...data, id }),
    );
  }
}
