import { Document } from 'mongoose';
import { Role } from './role.interface';

export interface User extends Document {
  readonly _id: string;
  readonly username: string;
  readonly password: string;
  readonly name: string;
  readonly lastName: string;
  readonly dateOfBirth: Date;
  readonly createdAt: Date;
  readonly updateAt: Date;
  readonly roles: Role[];
}
