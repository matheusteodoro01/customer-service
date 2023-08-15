import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import jwt_decode from 'jwt-decode';
import { Observable } from 'rxjs';
import {
  RoleDecoratorOptionsInterface,
  RoleMatchingMode,
} from './role.decorator';

type TokenPayload = {
  exp: number;
  iat: number;
  jti: string;
  iss: string;
  aud: string;
  sub: string;
  typ: string;
  azp: string;
  session_state: string;
  acr: string;
  'allowed-origins': string[];
  realm_access: {
    roles: string[];
  };
  resource_access: {
    [key: string]: {
      roles: string[];
    };
  };
  scope: string;
  sid: string;
  email_verified: boolean;
  preferred_username: string;
  given_name: string;
  family_name: string;
};

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const { roles, mode } = this.reflector.get<RoleDecoratorOptionsInterface>(
      'roles',
      context.getHandler(),
    );
    if (!roles) return true;
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.replace('Bearer ', '');
    const allowRoles =
      jwt_decode<TokenPayload>(token).resource_access['customer'].roles;

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
