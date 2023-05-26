import {
  Body,
  Delete,
  Get,
  HttpException,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AbstractService } from './abstract.service';
import { ClientSession } from 'mongoose';
import { AuthGuard } from '../guards/auth.guard';
import { RequestsPipe } from '../validations/requests.pipe';
import Joi from 'joi';
import { IAbstractFilters } from './abstract.interface';

// export function abstract(options: ControllerOptions) {
//   abstract class Abstract implements AbstractInterface {
//     constructor(public service: AbstractService) {}

//     @Get()
//     @UseGuards(AuthGuard)
//     async find(@Query('filters') filters: any): Promise<any[]> {
//       return this.service.find(filters);
//     }

//     @Post()
//     @ApiOperation(options.apiCreateSchema)
//     @ApiResponse(options.apiCreateResponseSchema)
//     @UseGuards(AuthGuard)
//     @UsePipes(new RequestsPipe(options.createValidation))
//     async create(@Body() params: any): Promise<any> {
//       try {
//         this.service.begin();
//         const response = await this.service.create(params);
//         await this.service.commit();

//         return response;
//       } catch (error) {
//         await this.service.rollback();
//       }
//     }

//     @Get(':id')
//     @UseGuards(AuthGuard)
//     async findById(@Param('id') id: string | ObjectId): Promise<any> {
//       return this.service.findById(id);
//     }

//     @Put(':id')
//     @ApiOperation(options.apiUpdateSchema)
//     @ApiResponse(options.apiUpdateResponseSchema)
//     @UseGuards(AuthGuard)
//     @UsePipes(new RequestsPipe(options.updateValidation))
//     async update(
//       @Param('id') id: string | ObjectId,
//       @Body() params: any,
//     ): Promise<any> {
//       try {
//         this.service.begin();
//         const response = await this.service.update(id, params);
//         await this.service.commit();

//         return response;
//       } catch (error) {
//         await this.service.rollback();
//       }
//     }

//     @Delete(':id')
//     @UseGuards(AuthGuard)
//     async delete(@Param('id') id: string | ObjectId): Promise<any> {
//       try {
//         this.service.begin();
//         const response = this.service.delete(id);
//         await this.service.commit();

//         return response;
//       } catch (error) {
//         await this.service.rollback();
//       }
//     }
//   }

//   return Abstract;
// }
@UseGuards(AuthGuard)
export abstract class AbstractController<T> {
  protected createValidation: Joi.ObjectSchema<any>;
  protected updateValidation: Joi.ObjectSchema<any>;
  protected session: ClientSession;

  UNPROCESSABLE_ENTITY = 422;

  constructor(protected service: AbstractService<T>) {}

  async begin() {
    this.session = await this.service.getModel().db.startSession();
    this.session.startTransaction();
  }

  async commit() {
    await this.session.commitTransaction();
    await this.session.endSession();
  }

  async rollback() {
    await this.session.abortTransaction();
    await this.session.endSession();
  }

  @Get()
  async find(@Query() filters: IAbstractFilters): Promise<T[]> {
    try {
      return await this.service.find(filters);
    } catch (error) {
      throw new HttpException(error?.response ?? error?.message, error?.status);
    }
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<T> {
    try {
      return await this.service.findById(id);
    } catch (error) {
      throw new HttpException(error?.response ?? error?.message, error?.status);
    }
  }

  @Post()
  async create(params: object): Promise<T> {
    new RequestsPipe(this.createValidation).transform(params, null);
    try {
      await this.begin();
      const response = await this.service.create(params, this.session);
      await this.commit();

      return response;
    } catch (error) {
      await this.rollback();
      throw new HttpException(
        error?.response ?? error?.message,
        error?.status ?? this.UNPROCESSABLE_ENTITY,
      );
    }
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() params: object): Promise<T> {
    new RequestsPipe(this.updateValidation).transform(params, null);

    try {
      await this.begin();
      const response = await this.service.update(id, params);
      await this.commit();

      return response;
    } catch (error) {
      await this.rollback();
      throw new HttpException(
        error?.response ?? error?.message,
        error?.status ?? this.UNPROCESSABLE_ENTITY,
      );
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<T> {
    try {
      await this.begin();
      const response = await this.service.delete(id);
      await this.commit();

      return response;
    } catch (error) {
      await this.rollback();
      throw new HttpException(
        error?.response ?? error?.message,
        error?.status ?? this.UNPROCESSABLE_ENTITY,
      );
    }
  }
}
