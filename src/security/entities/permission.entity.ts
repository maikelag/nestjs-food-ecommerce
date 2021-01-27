import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { RoleEntity } from './';

@Entity('Permission')
export class PermissionEntity {
    @PrimaryGeneratedColumn() id: number;

    @Column({length: 160})
    permission: string;

    @ManyToMany(type => RoleEntity, role => role.permissions)
    roles: RoleEntity[];
}
