import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { DateTime } from 'luxon';

@Injectable()
export class LogActionsMiddleware implements NestMiddleware {
  use(request: Request, response: Response, next: NextFunction) {
    const start = DateTime.now().toMillis();
    const { ip, method, originalUrl } = request;
    const userAgent = request.get('user-agent') || '';

    response.on('finish', () => {
      const end = DateTime.now().toMillis();
      const log = {
        method,
        originalUrl,
        statusCode: response.statusCode,
        time: end - start,
        ip,
        userAgent,
        requestBody: {
          body: request.body,
          query: request.query,
        },
        user: request['user'],
      };
      //console.log(log);
    });

    next();
  }
}
