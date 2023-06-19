import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { UnauthorizedError } from '@/domain/errors';
import { getPublicKey } from './get-public-key';
import { verify } from 'jsonwebtoken';

@Injectable()
export class AuthInterceptor implements NestInterceptor {
  constructor() {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.replace('Bearer ', '');
    const publicKey = await getPublicKey();
    try {
      const decodedToken = verify(token, publicKey);
      const isValidToken = !!decodedToken;
      if (!isValidToken) {
        throw new UnauthorizedError('Não autorizado');
      }
      return next.handle();
    } catch (error) {
      throw new UnauthorizedError('Não autorizado');
    }
  }
}
