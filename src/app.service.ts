import { HttpService, Injectable, Req } from '@nestjs/common';
import { Request } from 'express';
@Injectable()
export class AppService {
  constructor(
    private Http: HttpService
  ) {

  }
  getDataFromMobio(request: Request): Promise<any> {
    return new Promise((resolve, reject) => {
      this.Http.request({
        baseURL: `https://${request.headers.host}${request.url}`,
        headers: Object.assign({}, request.headers) as any,
      }).subscribe((data) => {
        return resolve(data);
      }, err => {
        return reject(err);
      })
    })
  }

  postDataFromMobio(request: Request): Promise<any> {
    return new Promise((resolve, reject) => {
      this.Http.request({
        baseURL: `https://${request.headers.host}${request.url}`,
        headers: Object.assign({}, request.headers) as any,
        method: 'post',
        data: request.body
      }).subscribe((data) => {
        return resolve(data);
      }, err => {
        return reject(err);
      })
    })
  }
}
