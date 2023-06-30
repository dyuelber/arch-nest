import { Body, Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { AbstractController } from '../../abstract/abstract.controller';
import {
  apiOperationCreate,
  apiOperationCreateResponse,
  createUser,
} from './validations/create-update';
import { UsersDocument } from './entities/user.entity';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { IAbstractFilters } from '../../abstract/abstract.interface';
import { IPaginateResult } from '../../utils/interfaces.util';

@Controller('users')
@ApiTags('users')
export class UsersController extends AbstractController<UsersDocument> {
  constructor(protected usersService: UsersService) {
    super(usersService);
    this.createValidation = createUser;
    this.updateValidation = createUser;
  }

  @Get()
  async find(filters: IAbstractFilters): Promise<IPaginateResult> {
    return await super.find(filters);
  }

  @Get(':id')
  async findById(id: string): Promise<UsersDocument> {
    return await super.findById(id);
  }

  @Post()
  @ApiOperation(apiOperationCreate)
  @ApiResponse(apiOperationCreateResponse)
  async create(@Body() params: object): Promise<UsersDocument> {
    return await super.create(params);
  }

  @Put(':id')
  async update(id: string, @Body() params: object): Promise<UsersDocument> {
    return await super.update(id, params);
  }

  @Delete(':id')
  async delete(id: string): Promise<UsersDocument> {
    return await super.delete(id);
  }
}
