import { IsNotEmpty, IsString } from "class-validator";

export class UserAuthDTO {
    @IsNotEmpty()
    @IsString()
    username: string;
  
    @IsNotEmpty()
    @IsString()
    password: string;
  }
  