import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { RoleName } from '../enums';

@Injectable()
export class OfficeScopeGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<{
      params: { officeId?: string; id?: string };
      user?: { roles?: RoleName[]; officeIds?: string[] };
    }>();

    if (request.user?.roles?.includes(RoleName.SuperAdmin)) return true;

    const officeId = request.params.officeId ?? request.params.id;
    if (!officeId || request.user?.officeIds?.includes(officeId)) return true;

    throw new ForbiddenException('User is not scoped to this office.');
  }
}
