import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UsersDocument = HydratedDocument<Users>;

@Schema({ timestamps: true, versionKey: false })
export class Users {
  @Prop()
  name: string;

  @Prop()
  age: number;
}

export const UsersSchema = SchemaFactory.createForClass(Users);
