import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { UserRO } from '../../security/dtos/user.dto';

@Injectable()
export class UserGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const rolesToCheck: string[] = this.reflector.get<string[]>(
      'roles',
      context.getHandler(),
    );
    const request = context.switchToHttp().getRequest();
    const user: any = request.user;
    return user && user.roles && this.userHasRole(user, rolesToCheck[0]);
  }

  userHasRole(user: UserRO, role: string): boolean {
    return user.roles.some(el => el.role === role);
  }
}
