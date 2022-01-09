import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
const fs = require('fs');
@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => any) {
    if (!req || !req.query || !req.query.FE_URL || !res) {
      throw false;
    }
    const baseURL = `${decodeURIComponent(req.query.FE_URL as string)}`;
    req.headers.host = baseURL.replace('https://', '');
    delete req.headers['content-length'];
    next();
  }
}
