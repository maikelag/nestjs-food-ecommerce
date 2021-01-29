import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  Put,
  UsePipes, UseGuards, ParseIntPipe,
} from '@nestjs/common';
import { User } from '../interfaces/user.interface';
import { UserEntity} from '../entities'
import { UserService } from '../services';
import { UserDTO, UserAuthDTO } from '../dtos/user.dto';
import { UserDecorator } from '../../common/decorators/user.decorator';
import { ValidationPipe } from '../../common/validation.pipe';
import { RoleEntity } from '../entities/role.entity';

@Controller('users')
export class UserController {
  constructor(private readonly usersService: UserService) {}

  @Get()
  findAll(): Promise<UserEntity[]> {
    return this.usersService.findAll();
  }

  @UsePipes(new ValidationPipe())
  @Post()
  createUser(@Body() userData: UserDTO) {
    return this.usersService.createUser(userData);
  }

  @Get('/who-i-am')
  whoIAm(@UserDecorator() user) {
    return this.usersService.whoIAm(user.id);
  }

  @Post('/create-superuser')
  createSuperUser() {
    console.log('creando superusuario')
    return this.usersService.createSuperUser();
  }

  @Get('/:id')
  findOneUser(@Param('id') id: string) {
    return this.usersService.findOneUser(id);
  }

  @Delete('/:id')
  removeUser(@Param('id') id: string) {
    return this.usersService.removeUser(id);
  }

  @UsePipes(new ValidationPipe())
  @Post('/login')
  loginUser(@Body() user: UserAuthDTO) {
    return this.usersService.login(user);
  }

  @Patch('/password')
  changePassword(@Body() user: User) {
    return this.usersService.changePassword(user);
  }

  @Put('/:id')
  updateUser(
    @Param('id') userId: string,
    @Body() userData: Partial<UserDTO>,
  ) {
    return this.usersService.updateUser(userId, userData);
  }

  @Put('/:id/roles')
  updateRoleOfUser(
    @Param('id') userId: string,
    @Body() roles: RoleEntity[],
  ) {
    return this.usersService.updateRolesOfUser(userId, roles);
  }

}
