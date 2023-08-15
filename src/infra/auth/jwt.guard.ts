import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { verify } from 'jsonwebtoken';
import { getPublicKey } from './get-public-key';

@Injectable()
export class AuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.replace('Bearer ', '');
    const publicKey = await getPublicKey();
    const decodedToken = verify(token, publicKey);
    return !!decodedToken;
  }
}
