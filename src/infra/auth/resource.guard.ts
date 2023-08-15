import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import jwt_decode from 'jwt-decode';
import { JwtModel } from './jtw-model';

@Injectable()
export class ResourceGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext) {
    const resource = this.reflector.get<string>('resource', context.getClass());
    if (!resource) return true;
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.replace('Bearer ', '');
    const allowResources = jwt_decode<JwtModel>(token).resource_access;
    return !!allowResources[resource];
  }
}
