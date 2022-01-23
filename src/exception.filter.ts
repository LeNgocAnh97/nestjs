import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { of } from 'rxjs';
const fs = require('fs')
@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    const [space, module, api, version, other] = request.url.split('/');
    delete request.params.FE_URL
    const fileName = `${module}-${api}-${version}-${other.split('?')[0]}`;

    response.status(status).json({
      code: status,
      data: {},
      message: 'Co loi ket noi server'
    });
  }
}