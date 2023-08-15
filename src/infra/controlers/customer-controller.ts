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
  UseGuards,
} from '@nestjs/common';
import {
  saveCustomerDto,
  getCustomerDto,
  updateCustomerDto,
} from '@/infra/dto';
import { domain } from '@/domain/common/ioc';

import { RoleMatchingMode, Roles } from '../auth/role.decorator';
import { AuthGuard } from '../auth/jwt.guard';
import { RoleGuard } from '../auth/role.guard';

@Controller('customer')
@UseGuards(AuthGuard)
@UseGuards(RoleGuard)
export class CustomerController {
  constructor(
    @Inject(domain.usecases.saveCustomer)
    private readonly creteCustomerUseCase: SaveCustomerUseCase,
    @Inject(domain.usecases.getCustomer)
    private readonly getCustomerUseCase: GetCustomerByIdUseCase,
    @Inject(domain.usecases.updateCustomer)
    private readonly updateCustomerUseCase: UpdateCustomerUseCase,
  ) {}

  @Roles({ roles: ['admin'], mode: RoleMatchingMode.ANY })
  @Post()
  async save(@Body() data: any) {
    return await this.creteCustomerUseCase.execute(saveCustomerDto.parse(data));
  }

  @Roles({ roles: ['user', 'admin'], mode: RoleMatchingMode.ANY })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.getCustomerUseCase.execute(getCustomerDto.parse({ id }));
  }

  @Roles({ roles: ['admin'], mode: RoleMatchingMode.ALL })
  @Put(':id')
  async update(@Param('id') id: string, @Body() data: any) {
    return await this.updateCustomerUseCase.execute(
      updateCustomerDto.parse({ ...data, id }),
    );
  }
}
