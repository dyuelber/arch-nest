import { Body, Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { AbstractController } from '../abstract/abstract.controller';
import {
  apiOperationCreate,
  apiOperationCreateResponse,
  createUser,
} from './validations/create';
import { UsersDocument } from './entities/user.entity';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ObjectId } from 'mongoose';

@Controller('users')
export class UsersController extends AbstractController<UsersDocument> {
  constructor(protected usersService: UsersService) {
    super(usersService);
    this.createValidation = createUser;
    this.updateValidation = createUser;
  }

  @Get(':id')
  async findById(id: string | ObjectId): Promise<UsersDocument> {
    return super.findById(id);
  }

  @Post()
  @ApiOperation(apiOperationCreate)
  @ApiResponse(apiOperationCreateResponse)
  async create(@Body() params: any): Promise<UsersDocument> {
    return await super.create(params);
  }

  @Put(':id')
  async update(id: string | ObjectId, params: any): Promise<UsersDocument> {
    return await super.update(id, params);
  }

  @Delete(':id')
  async delete(id: string | ObjectId): Promise<UsersDocument> {
    return await super.delete(id);
  }
}
