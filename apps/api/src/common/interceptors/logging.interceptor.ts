import {
  type CallHandler,
  type ExecutionContext,
  Injectable,
  Logger,
  type NestInterceptor,
} from '@nestjs/common';
import { tap } from 'rxjs/operators';

import type { Request, Response } from 'express';
import type { Observable } from 'rxjs';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger('HTTP');

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const request = context.switchToHttp().getRequest<Request>();
    const response = context.switchToHttp().getResponse<Response>();
    const { method, originalUrl } = request;
    const start = Date.now();

    return next.handle().pipe(
      tap(() => {
        const { statusCode } = response;
        const duration = Date.now() - start;
        this.logger.log(`${method} ${originalUrl} ${statusCode} - ${duration}ms`);
      }),
    );
  }
}
