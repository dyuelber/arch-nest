import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UsersDocument = Users & Document;

@Schema({ timestamps: true, versionKey: false, collection: 'users' })
export class Users {
  @Prop()
  name: string;

  @Prop()
  age: number;
}

export const UsersSchema = SchemaFactory.createForClass(Users);
