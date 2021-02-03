import { IsNotEmpty, IsArray, IsAlphanumeric, IsString, IsEmail } from 'class-validator';
import { RoleEntity } from '../entities';

export class UserUpdateDto {
  @IsString()
  name?: string;

  @IsString()
  lastName?: string;
}
