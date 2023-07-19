import { Body, Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { AbstractController } from '../../abstract/abstract.controller';
import {
  apiOperationCreate,
  apiOperationCreateResponse,
  createUser,
} from './validations/create-update';
import { Users } from './entities/user.entity';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { IAbstractFilters } from '../../abstract/abstract.interface';
import { IPaginateResult } from '../../utils/interfaces.util';

@Controller('users')
@ApiTags('users')
export class UsersController extends AbstractController<Users> {
  constructor(protected usersService: UsersService) {
    super(usersService);
    this.createValidation = createUser;
    this.updateValidation = createUser;
  }

  @Get()
  async find(filters: IAbstractFilters): Promise<IPaginateResult<Users>> {
    return await super.find(filters);
  }

  @Get(':id')
  async findById(id: string): Promise<Users> {
    return await super.findById(id);
  }

  @Post()
  @ApiOperation(apiOperationCreate)
  @ApiResponse(apiOperationCreateResponse)
  async create(@Body() params: Users): Promise<Users> {
    return await super.create(params);
  }

  @Put(':id')
  async update(id: string, @Body() params: Users): Promise<Users> {
    return await super.update(id, params);
  }

  @Delete(':id')
  async delete(id: string): Promise<Users> {
    return await super.delete(id);
  }
}
