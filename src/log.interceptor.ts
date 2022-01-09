import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable, of, Subject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Response, Request } from 'express';
const fs = require('fs');
@Injectable()
export class CacheDataInterceptor implements NestInterceptor {
  public mode: 1 | 2 | 3 = 1;

  // mode1: node main.js chế độ này sẽ lấy dữ liệu từ cache khi không gọi được api
  // mode2: node main.js 1 chế độ này sẽ ưu tiên tìm trong cache,nếu ko có trong cache thì sẽ gọi api,nếu api ko gọi được thì tiếp tục tìm trong cache
  // mode3: node main.js 2 chế độ này sẽ gọi thẳng lên server sẽ ko bao giờ lấy từ dữ liệu từ cache

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {

    const ctx = context.switchToHttp();
    const response: Response = ctx.getResponse();
    const request: Request = ctx.getRequest();
    const [space, module, api, version, other] = request.url.split('/');
    delete request.params.FE_URL

    const fileName = `${module}-${api}-${version}-${other.split('?')[0]}`;

    if ((this.mode === 1 || this.mode === 2) && fs.existsSync(`./src/cache/${fileName}.json`)) {
      const data = fs.readFileSync(`./src/cache/${fileName}.json`, 'utf8')
      if (data) {
        return of(JSON.parse(data));
      }
    }

    return next
      .handle()
      .pipe(
        map((data) => {
          fs.writeFileSync(`./src/cache/${module}-${fileName}.json`, JSON.stringify(data.data));
          return data.data;
        }),
      );

  }
}
