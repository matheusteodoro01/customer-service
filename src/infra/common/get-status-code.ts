import { ZodError } from 'zod';
import { HttpStatus } from '@nestjs/common';
import {
  CacheNotAvailableError,
  NotFoundError,
  SsoNotAvailableError,
} from '@/domain/errors';
import { UnauthorizedError } from '@/domain/errors/unauthorized';

export const getErrorStatusCode = (error: unknown): HttpStatus => {
  if (!(error instanceof Error)) {
    return HttpStatus.INTERNAL_SERVER_ERROR;
  }

  switch (error.constructor) {
    case UnauthorizedError:
      return HttpStatus.UNAUTHORIZED;
    case ZodError:
      return HttpStatus.BAD_REQUEST;
    case NotFoundError:
      return HttpStatus.NOT_FOUND;
    case CacheNotAvailableError:
      return HttpStatus.BAD_GATEWAY;
    case SsoNotAvailableError:
      return HttpStatus.BAD_GATEWAY;
    default:
      return HttpStatus.INTERNAL_SERVER_ERROR;
  }
};
