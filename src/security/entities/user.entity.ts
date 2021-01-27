import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
} from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { RoleEntity } from './';
import { sign } from 'jsonwebtoken';

@Entity('Users')
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn() id: number;

  @Column({ length: 160, nullable: true })
  email: string;

  @Column({ length: 160 })
  username: string;

  @Column({ length: 160 })
  name: string;

  @Column({ length: 160 })
  lastName: string;

  @Column({ length: 100 })
  password: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  @ManyToMany(
    type => RoleEntity,
    role => role.users,
    { cascade: true },
  )
  @JoinTable()
  roles: RoleEntity[];

  async comparePassword(passwordToCompare: string) {
    return await bcrypt.compare(passwordToCompare, this.password);
  }

  public get token() {
    const { id, username, roles } = this;
    return sign({ user: { id, username, roles } }, process.env.SECRET || 'AVOCADO', {
      expiresIn: '7d',
    });
  }

  toResponseUser(showToken?: boolean) {
    const { id, createdAt, username, name, lastName, email, token } = this;
    const responseObject: any = { id, createdAt, username, name, lastName, email, };
    if (showToken) {
      responseObject.token = token;
    }
    if (this.roles) {
      responseObject.roles = this.roles;
    }
    return responseObject;
  }

}
