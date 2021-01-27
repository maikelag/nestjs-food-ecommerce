import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { UserRO } from '../../security/dtos/user.dto';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const permissionToCheck: string[] = this.reflector.get<string[]>(
      'permissions',
      context.getHandler(),
    );
    const request = context.switchToHttp().getRequest();
    const user: any = request.user;
    return (
      user && user.roles && this.userHasPermission(user, permissionToCheck[0])
    );
  }

  userHasPermission(user: UserRO, permission: string): boolean {
    let flag = false;
    let i = 0;
    while (!flag && i < user.roles.length) {
      if (user.roles[i].permissions.some(el => el.permission === permission)) {
        flag = true;
      }
      i++;
    }
    return flag;
  }
}
