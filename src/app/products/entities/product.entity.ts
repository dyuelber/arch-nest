import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId, SchemaTypes } from 'mongoose';
import { IProductStatus } from '../interfaces/products.interface';
import { Users } from '../../users/entities/user.entity';

export type ProductDocument = Product & Document;

@Schema({ timestamps: true, versionKey: false, collection: 'products' })
export class Product {
  @Prop({ type: SchemaTypes.ObjectId, ref: () => Users })
  _userId?: ObjectId;

  @Prop()
  name: string;

  @Prop()
  amount: number;

  @Prop({ enum: IProductStatus, default: IProductStatus.pending })
  status?: IProductStatus;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
