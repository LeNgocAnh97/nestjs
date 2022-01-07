import { Controller, Delete, Get, Param, Post, Put, Req, Res, UseFilters, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { Request, response } from 'express';
import { AllExceptionsFilter } from './exception.filter';
import { LogInterceptor } from './log.interceptor';
import { Observable } from 'rxjs';

@Controller('*')
export class AppController {
  constructor(
    private readonly appService: AppService
  ) {
  }

  @Get()
  @UseInterceptors(LogInterceptor)
  @UseFilters(new AllExceptionsFilter())
  find(@Req() request: Request): any {
    // console.log('aaa');
    return {
      data: [

      ],
      code: 200
    };
  }
} 
