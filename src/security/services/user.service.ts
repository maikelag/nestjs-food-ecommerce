import {
  Injectable,
  HttpStatus,
  HttpException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';

import { UserEntity, RoleEntity, PermissionEntity } from '../entities';
import { UserDTO } from '../dtos/user.dto';
import { UserTokenData } from 'src/security/interfaces/user-token.interface';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
    @InjectRepository(RoleEntity)
    private readonly rolesRepository: Repository<RoleEntity>,
    @InjectRepository(PermissionEntity)
    private readonly permissionRepository: Repository<PermissionEntity>,
  ) {}

  private async ensureUserExist(userId: number) {
    const user = await this.usersRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new HttpException('User not exist', HttpStatus.BAD_REQUEST);
    }
  }

  async findAll(): Promise<UserEntity[]> {
    const users = await this.usersRepository.find({ relations: ['roles'] });
    return users.map(u => u.toResponseUser());
  }

  async findOneUser(userId: number): Promise<UserEntity> {
    await this.ensureUserExist(userId);
    const user = await this.usersRepository.findOne({ where: { id: userId } })
    return user.toResponseUser();
  }

  async createUser(userData: UserDTO): Promise<UserEntity> {
    const userFind = await this.usersRepository.findOne({
      where: { username: userData.username },
    });
    if (userFind) {
      throw new HttpException('User already exist', HttpStatus.BAD_REQUEST);
    }
    userData.password = await this.encryptPassword(userData.password);
    console.log(userData)
    const user = await this.usersRepository.create(userData);
    await this.usersRepository.save(user);
    return user.toResponseUser();  }

  async removeUser(id: number) {
    await this.ensureUserExist(id);
    const userToDelete = await this.usersRepository.findOne({ where: { id } });
    await this.usersRepository.remove(userToDelete);
    return userToDelete.toResponseUser();
  }

  // Arreglar, no funciona la actualizacion de la relacion con roles
  async updateUser(userId: number, userData: Partial<UserDTO>) {
    await this.ensureUserExist(userId);
    const userToUpdate = await this.usersRepository.findOne({
      where: { id: userId },
    });
    userData.roles = undefined;
    await this.usersRepository.update(
      { id: userId },
      { username: userData.username },
    );
    return userToUpdate.toResponseUser();
  }

  async findOneByToken(token: string) {
    try {
      const decodeToken: any = await jwt.verify(token, process.env.SECRET || 'AVOCADO'); 
      const user = await this.usersRepository.findOne({
        where: { username: decodeToken.user.username },
        relations: ['roles'],
      });
      if (!user) {
        return new HttpException('Data Token Unexpected', HttpStatus.FORBIDDEN);
      }

      for (let i = 0; i < user.roles.length; i++) {
        const rolesOfUser = await this.rolesRepository.findOne({
          where: { id: user.roles[i].id },
          relations: ['permissions'],
        });
        user.roles[i] = rolesOfUser;
      }

      return user;
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        throw new HttpException(error.name, HttpStatus.FORBIDDEN);
      } else {
        throw new HttpException('Token Error', HttpStatus.FORBIDDEN);
      }
    }
  }

  async login(data: any) {
    const { username, password } = data;
    const user = await this.usersRepository.findOne({
      where: { username },
    });
    if (!user || !bcrypt.compareSync(password, user.password)) {
      return new HttpException(
        'Invalid username/password',
        HttpStatus.BAD_REQUEST,
      );
    }
    const token = user.token;
    user.password = undefined;

    return { ...user, token };
  }

  async whoIAm(userId: number) {
    const user = await this.usersRepository.findOne({
      where: { id: userId },
      relations: ['roles'],
    });
    user.password = undefined;
    return user;
  }

  async encryptPassword(password: string): Promise<string> {
    const genSalt = 5;
    return new Promise(async (resolve, reject) => {
      bcrypt.hash(password, genSalt, (err, hash: string) => {
        if (err) {
          reject(err);
        }
        resolve(hash);
      });
    });
  }

  async createSuperUser() {
    const principalRoleName = 'SuperuserRole'
    const permissions = await this.permissionRepository.find();
    await this.rolesRepository.save({
      role: principalRoleName,
      permissions: permissions,
    });
    const role = await this.rolesRepository.findOne({
      where: { role: 'SuperuserRole' },
    });
    if (role.role !== 'SuperuserRole') {
      this.rolesRepository.save({
        role: principalRoleName,
        permissions: permissions,
      });
    }
    const rolesOfUser = [];
    rolesOfUser.push(
      await this.rolesRepository.findOne({ where: { role: principalRoleName } }),
    );
    const superuser: any = {
      username: 'superuser',
      email: "superuser@xyz.com",
      password: '123456',
      roles: rolesOfUser,
      name: 'Superuser',
      lastName: 'Superuser'
    };
    return this.createUser(superuser);
  }

  async changePassword(user: Partial<UserDTO>) {
    const userToChangePass = await this.usersRepository.findOne({
      where: { username: user.username },
    });
    if (!userToChangePass) {
      throw new HttpException('The user not exist', HttpStatus.BAD_REQUEST);
    }
    user.password = await this.encryptPassword(user.password);
    await this.usersRepository.update(
      { username: user.username },
      { password: user.password },
    );
    return userToChangePass.toResponseUser();
  }

  async updateRolesOfUser(
    userId: number,
    roles: RoleEntity[],
  ): Promise<UserEntity> {
    const userToUpdate = await this.usersRepository.findOne({
      where: { id: userId },
    });
    if (!userToUpdate) {
      throw new NotFoundException(`Task with ID ${userId} not found`);
    }
    userToUpdate.roles = roles;
    await userToUpdate.save();
    return userToUpdate;
  }

  async findUserByTokenData(userTokenData: UserTokenData) {
    const user = await this.usersRepository.findOne({
      where: { username: userTokenData.username },
      relations: ['roles'],
    });
    if (!user) {
      return new HttpException('Data Token Unexpected', HttpStatus.FORBIDDEN);
    }

    for (let i = 0; i < user.roles.length; i++) {
      user.roles[i] = await this.rolesRepository.findOne({
        where: { id: user.roles[i].id },
        relations: ['permissions'],
      });
    }

    return user;
  }
}
