import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private readonly passUrl: string[] = ['/health'];

  public use(req: Request, res: Response, next: () => void) {
    if (this.passUrl.includes(req.originalUrl)) {
      return next();
    }

    const user = req.user ? req.user.id : '';
    Logger.log(`${req.method} ${req.originalUrl} - ${req.ip.replace('::ffff:', '')} ${user}`);

    next();
  }
}