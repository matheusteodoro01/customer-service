import { getPublicKey } from '@/infra/common/get-public-key';
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { verify } from 'jsonwebtoken';

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
