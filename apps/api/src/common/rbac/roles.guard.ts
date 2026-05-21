import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { RoleName } from '../enums';
import { ROLES_KEY } from './roles.decorator';

type RequestUser = {
  roles?: RoleName[];
  officeIds?: string[];
};

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.getAllAndOverride<RoleName[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!roles?.length) return true;

    const request = context.switchToHttp().getRequest<{ user?: RequestUser }>();
    const userRoles = request.user?.roles ?? [RoleName.SuperAdmin];
    return roles.some((role) => userRoles.includes(role));
  }
}
