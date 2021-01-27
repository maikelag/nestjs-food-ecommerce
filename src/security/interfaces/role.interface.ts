import { Document } from 'mongoose';
import { Permission } from './permission.interface';

export interface Role extends Document {
  readonly _id: string;
  readonly role: string;
  readonly createdAt: Date;
  readonly updateAt: Date;
  readonly permissions: Permission[];
}
