import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UsePipes,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { RoleService } from '../services';
import { RoleDTO } from '../dtos/role.dto';
import { PermissionList } from '../../common/permissions.enum';
import { RolesGuard } from '../../common/guards/roles.guard';
import { PermissionsDecorator } from '../../common/decorators/permission.decorator';
import { ValidationPipe } from '../../common/validation.pipe';
import { RoleEntity } from '../entities';

@Controller('roles')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Get()
  findAll(): Promise<RoleEntity[]> {
    return this.roleService.findAll();
  }

  @UsePipes(new ValidationPipe())
  @Post()
  createRole(@Body() role: RoleDTO): Promise<RoleEntity> {
    return this.roleService.createRole(role);
  }

  @Delete('/:id')
  removeRole(@Param('id', new ParseIntPipe) id: number) {
    return this.roleService.removeRole(id);
  }

  @PermissionsDecorator(PermissionList.READ_ROLES)
  @Get('/:id')
  findOneRole(@Param('id', new ParseIntPipe) roleId: number) {
    return this.roleService.findOneRole(roleId);
  }
}
