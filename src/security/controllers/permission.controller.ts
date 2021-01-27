import { Controller, Get } from '@nestjs/common';
import { PermissionEntity } from '../entities';
import { PermissionService } from '../services';

@Controller('permissions')
export class PermissionController {
  constructor(private readonly permissionService: PermissionService) {}

  @Get()
  findAll(): Promise<PermissionEntity[]> {
    return this.permissionService.findAll();
  }

  @Get('/create-permissions')
  createFullPermissionsAuto() {
    return this.permissionService.fullPermmissionsAuto();
  }
}
