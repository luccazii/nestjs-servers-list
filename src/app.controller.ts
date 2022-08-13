import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello() {
    return this.appService.getHello();
  }

  @Get('server-info/:host/:port')
  getServerInfo(@Param() params) {
    console.log(params.host);
    return this.appService.getServerInfo(params.host, params.port);
  }

  @Get('servers')
  getServerList() {
    return this.appService.getServerList();
  }
}
