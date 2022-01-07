import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
const fs = require('fs');
import { json } from 'body-parser'
@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  // use(req: Request, res: Response, next: Function) {
  //   console.log(res);
  //   fs.writeFile(`src/cache/c.txt`, res.statusCode, (err) => {
  //     if (err) throw err;
  //   })

  //   next();
  // }
  use(req: Request, res: Response, next: () => any) {
    // req.headers.host = 'https%3A%2F%2Fapi-test1.mobio.vn';
    // // req.headers.ur = 'https%3A%2F%2Fapi-test1.mobio.vn' + req.path;
    // delete req.query.FE_URL;
    // console.log(req);
    // fs.writeFile(`src/cache/c.txt`, json()(req as any, res as any, next), (err) => {
    //   if (err) throw err;
    // })
    const url = req.path.replace('/server-mask', '');
    const baseURL = `${decodeURIComponent(req.query.FE_URL as string)}`;
    req.headers.host = baseURL.replace('https://', '');
    delete req.headers['content-length'];
    delete req.params.FE_URL;
    // console.log(baseURL);
    // console.log(url);
    // console.log(res.statusCode)
    // req.headers.host = baseURL;
    // return { baseURL, url };
    next();
  }
}
