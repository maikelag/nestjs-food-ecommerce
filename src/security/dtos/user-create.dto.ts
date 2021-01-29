import { IsNotEmpty, IsArray, IsAlphanumeric, IsString, IsEmail } from 'class-validator';
import { RoleEntity } from '../entities';

export class UserCreateDto {
  @IsNotEmpty()
  @IsAlphanumeric()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsString()
  name: string;

  @IsString()
  lastName: string;

  @IsArray()
  roles: RoleEntity[];
}

