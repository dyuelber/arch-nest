import { SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type AbstractDocument = HydratedDocument<Abstract>;

export class Abstract {}

export const AbstractSchema = SchemaFactory.createForClass(Abstract);
