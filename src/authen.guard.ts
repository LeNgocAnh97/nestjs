import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AuthenGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    // if ((request && request.headers && request.headers['authorization']) || request.url.includes('adm') || request.url.includes('dnc')) {
    //   return true;
    // }
    return true;
  }
}
