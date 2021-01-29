import { IsNotEmpty, IsString, IsArray } from 'class-validator';
import { PermissionEntity } from '../entities';

export class RoleCreateDto {
    @IsNotEmpty()
    @IsString()
    role: string;
  
    @IsArray()
    permissions: PermissionEntity[];
}

