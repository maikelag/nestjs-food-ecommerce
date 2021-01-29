import { IsNotEmpty, IsArray, IsAlphanumeric, IsString, IsEmail } from 'class-validator';
import { Role } from '../interfaces/role.interface';

export class UserRO {
  id?: string;
  username: string;
  roles: Role[];
  createdAt: Date;
}