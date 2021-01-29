import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PermissionEntity } from '../entities';
import { PermissionList } from '../../common/permissions.enum';

@Injectable()
export class PermissionService {
  constructor(
    @InjectRepository(PermissionEntity)
    private readonly permissionRepository: Repository<PermissionEntity>,
  ) {}

  async findAll(): Promise<PermissionEntity[]> {
    return await this.permissionRepository.find();
  }

  async createPermission(permission: PermissionEntity): Promise<PermissionEntity> {
    return this.permissionRepository.save(permission);
  }

  async removePermission(id: string) {
    const permissionToDelete = await this.permissionRepository.findOne({
      where: { id },
    });
    return this.permissionRepository.remove(permissionToDelete);
  }

  async fullPermmissionsAuto() {
    for (const i of Object.keys(PermissionList)) {
      const perm = await this.permissionRepository.findOne({
        where: { permission: PermissionList[i] },
      });
      if (!perm) {
        const permission = {
          permission: PermissionList[i],
        };
        await this.permissionRepository.save(permission);
        console.log('Nuevo permiso creado ', PermissionList[i]);
      }
    }
  }
}
