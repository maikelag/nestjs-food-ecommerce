import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RoleEntity, PermissionEntity } from '../entities';
import { RoleCreateDto, RoleUpdateDto } from '../dtos';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(RoleEntity)
    private readonly roleRepository: Repository<RoleEntity>,
    @InjectRepository(PermissionEntity)
    private readonly permissionRepository: Repository<PermissionEntity>,
  ) {}

  private async ensureRoleExist(roleId: string): Promise<RoleEntity> {
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

  async createRole(roleData: RoleCreateDto): Promise<RoleEntity> {
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

  async removeRole(id: string) {
    const roleToDelete = await this.ensureRoleExist(id);
    return this.roleRepository.remove(roleToDelete);
  }

  async findOneRole(roleId: string): Promise<RoleEntity> {
    return this.roleRepository.findOne({
      where: { id: roleId },
      relations: ['permissions'],
    });
  }

  async changeNameRole(roleId: string, name: string) {
    const role = await this.findOneRole(roleId);
    role.role = name;
    await this.roleRepository.save(role);
    return role;
  }

  async changePermissionsRole(roleId: string, permissions: Array<PermissionEntity>) {
    const role = await this.findOneRole(roleId);
    role.permissions = permissions;
    await this.roleRepository.save(role);
    return role;
  }

  async updateRole(roleId: string, roleData: RoleUpdateDto) {
    const role = await this.findOneRole(roleId);
    role.permissions = roleData.permissions;
    await this.roleRepository.save(role);
    delete roleData.permissions;

    await this.roleRepository.update(roleId, roleData);
    return role;
  }

  async roleHasPermission(roleId: string, permissionId: string): Promise<boolean> {
    return
  }

  async createSuperuserRole() {
    const permissions = await this.permissionRepository.find();
    return await this.roleRepository.save({
      role: 'SuperuserRole',
      permissions,
    });
  }
}
