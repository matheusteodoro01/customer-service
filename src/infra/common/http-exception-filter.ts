import { ExceptionFilter, Catch, ArgumentsHost, Logger } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { getErrorStatusCode } from '@/infra/common';
import { ZodError } from 'zod';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(
    private readonly httpAdapterHost: HttpAdapterHost,
    private readonly logger: Logger,
  ) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();
    const statusCode = getErrorStatusCode(exception);
    const message =
      exception instanceof ZodError
        ? 'Request inválida'
        : exception instanceof Error
        ? exception.message
        : 'Internal server error';

    exception instanceof Error
      ? this.logger.error(exception.message, JSON.stringify(exception.stack))
      : this.logger.error(JSON.stringify(exception));

    const responseBody = {
      message,
    };

    httpAdapter.reply(ctx.getResponse(), responseBody, statusCode);
  }
}
