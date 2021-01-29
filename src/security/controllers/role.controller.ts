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
import { RoleCreateDto, RoleUpdateDto } from '../dtos';
import { PermissionList } from '../../common/permissions.enum';
import { RolesGuard } from '../../common/guards/roles.guard';
import { PermissionsDecorator } from '../../common/decorators/permission.decorator';
import { ValidationPipe } from '../../common/validation.pipe';
import { PermissionEntity, RoleEntity } from '../entities';

@Controller('roles')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Get()
  findAll(): Promise<RoleEntity[]> {
    return this.roleService.findAll();
  }

  @UsePipes(new ValidationPipe())
  @Post()
  createRole(@Body() role: RoleCreateDto): Promise<RoleEntity> {
    return this.roleService.createRole(role);
  }

  @Delete('/:id')
  removeRole(@Param('id') id: string) {
    return this.roleService.removeRole(id);
  }

  @PermissionsDecorator(PermissionList.READ_ROLES)
  @Get('/:id')
  findOneRole(@Param('id') roleId: string) {
    return this.roleService.findOneRole(roleId);
  }

  @Put('/:id')
  updateRole(@Param('id') roleId: string, @Body() roleData: RoleUpdateDto) {
    return this.roleService.updateRole(roleId, roleData);
  }

  @Put('/:id/role')
  changeNameRole(@Param('id') roleId: string, @Body('role') role: string) {
    return this.roleService.changeNameRole(roleId, role);
  }

  @Put('/:id/permissions')
  changePermissionsRole(@Param('id') roleId: string, @Body('permissions') permissions: Array<PermissionEntity>) {
    return this.roleService.changePermissionsRole(roleId, permissions);
  }
}
