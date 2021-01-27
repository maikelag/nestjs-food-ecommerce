import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PermissionService, RoleService, UserService } from './services';
import { UserController, RoleController, PermissionController } from './controllers';
import { PermissionEntity, RoleEntity, UserEntity } from './entities';

@Module({
  imports: [
    TypeOrmModule.forFeature([PermissionEntity, RoleEntity, UserEntity]),
  ],
  controllers: [RoleController, PermissionController, UserController],
  providers: [RoleService, PermissionService, UserService,  ],
  exports: [UserService],
})
export class SecurityModule {}
