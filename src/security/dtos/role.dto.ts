import { IsNotEmpty, IsString, IsArray } from 'class-validator';
import { Permission } from '../interfaces/permission.interface';
import { User } from '../interfaces/user.interface'

export class RoleRO {
  id?: string;
  role: string;
  users: User[];
}
