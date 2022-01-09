import { Controller, Delete, Get, HttpService, Param, Post, Put, Req, Res, UseFilters, UseGuards, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { Request, response } from 'express';
import { AllExceptionsFilter } from './exception.filter';
import { CacheDataInterceptor } from './log.interceptor';
import { Observable } from 'rxjs';
import { AuthenGuard } from './authen.guard';

@Controller('*')
export class AppController {


  constructor(
    private readonly appService: AppService,
    private Http: HttpService
  ) {
  }

  @Get()
  @UseGuards(AuthenGuard)
  @UseInterceptors(CacheDataInterceptor)
  @UseFilters(new AllExceptionsFilter())
  async getDataGet(@Req() request: Request): Promise<any> {
    if (!request) {
      return;
    }
    try {
      const requestGet = Object.assign({}, request);
      return await this.appService.getDataFromMobio(requestGet);
    }
    catch (e) {
      throw new Error('loi');
    }
  }

  @Post()
  @UseGuards(AuthenGuard)
  @UseInterceptors(CacheDataInterceptor)
  @UseFilters(new AllExceptionsFilter())
  async getDataPost(@Req() request: Request): Promise<any> {
    if (!request) {
      return;
    }
    try {
      const requestGet = Object.assign({}, request);
      return await this.appService.postDataFromMobio(requestGet);
    }
    catch (e) {
      throw new Error(e);
    }
  }
} 
