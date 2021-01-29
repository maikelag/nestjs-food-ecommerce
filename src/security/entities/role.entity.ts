import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { UserEntity } from './';
import { PermissionEntity } from './';

@Entity('Roles')
export class RoleEntity {
  @PrimaryGeneratedColumn('uuid') id: string;

  @Column({ length: 160 })
  role: string;

  @ManyToMany(
    type => UserEntity,
    user => user.roles,
  )
  users: UserEntity[];

  @ManyToMany(
    type => PermissionEntity,
    permission => permission.roles,
  )
  @JoinTable()
  permissions: PermissionEntity[];
}
