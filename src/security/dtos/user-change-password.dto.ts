import { IsNotEmpty, IsString } from "class-validator";

export class UserChangePasswordDTO {
    @IsNotEmpty()
    @IsString()
    username: string;

    @IsNotEmpty()
    @IsString()
    oldPassword: string;
  
    @IsNotEmpty()
    @IsString()
    newPassword: string;

    @IsNotEmpty()
    @IsString()
    passwordConfirm: string;
  }