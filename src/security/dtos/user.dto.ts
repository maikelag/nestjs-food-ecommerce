import { IsNotEmpty, IsArray, IsAlphanumeric, IsString, IsEmail } from 'class-validator';
import { Role } from '../interfaces/role.interface';

export class UserRO {
  id?: string;
  username: string;
  roles: Role[];
  createdAt: Date;
}

// tslint:disable-next-line:max-classes-per-file
export class UserDTO {
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
  roles: Role[];
}

// tslint:disable-next-line:max-classes-per-file
export class UserAuthDTO {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
