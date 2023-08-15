import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import jwt_decode from 'jwt-decode';
import { Observable } from 'rxjs';
import { RoleDecoratorOptions, RoleMatchingMode } from './role.decorator';
import { JwtModel } from './jtw-model';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const { mode, roles } = this.reflector.get<RoleDecoratorOptions>(
      'roles',
      context.getHandler(),
    );
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.replace('Bearer ', '');
    const allowRoles =
      jwt_decode<JwtModel>(token).resource_access['customer']?.roles ?? [];

    if (mode === RoleMatchingMode.ALL) {
      const set1 = new Set(allowRoles);
      const set2 = new Set(roles);

      if (set1.size !== set2.size) return false;

      for (const item of set1) {
        if (!set2.has(item)) return false;
      }

      return true;
    } else if (mode === RoleMatchingMode.ANY) {
      const commonRoles = allowRoles.filter((role) => roles.includes(role));
      return commonRoles.length > 0;
    }

    return false;
  }
}
