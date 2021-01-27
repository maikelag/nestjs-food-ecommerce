import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { RoleEntity, PermissionEntity } from '../entities';
import { RoleDTO } from '../dtos/role.dto';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(RoleEntity)
    private readonly roleRepository: Repository<RoleEntity>,
    @InjectRepository(PermissionEntity)
    private readonly permissionRepository: Repository<PermissionEntity>,
  ) {}

  private async ensureRoleExist(roleId: number): Promise<RoleEntity> {
    const role = await this.roleRepository.findOne({
      where: { id: roleId },
      relations: ['permissions'],
    });
    if (!role) {
      throw new HttpException('Role not exist', HttpStatus.BAD_REQUEST);
    }
    return role;
  }

  async findAll(): Promise<RoleEntity[]> {
    return await this.roleRepository.find({ relations: ['permissions'] });
  }

  async createRole(roleData: RoleDTO): Promise<RoleEntity> {
    const roleFind = await this.roleRepository.findOne({
      where: { role: roleData.role },
    });
    if (roleFind) {
      throw new HttpException('Role already exist', HttpStatus.BAD_REQUEST);
    }
    const role = await this.roleRepository.create(roleData);
    await this.roleRepository.save(role);
    return role;
  }

  async removeRole(id: number) {
    const roleToDelete = await this.ensureRoleExist(id);
    return this.roleRepository.remove(roleToDelete);
  }

  async findOneRole(roleId: number): Promise<RoleEntity> {
    return this.roleRepository.findOne({
      where: { id: roleId },
      relations: ['permissions'],
    });
  }

  async createSuperuserRole() {
    const permissions = await this.permissionRepository.find();
    return await this.roleRepository.save({
      role: 'SuperuserRole',
      permissions,
    });
  }
}
