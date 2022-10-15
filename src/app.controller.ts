import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello() {
    return this.appService.getHello();
  }

  @Get('server-info/:host/:port/:rconPassword?')
  getServerInfo(@Param() params) {
    return this.appService.getServerInfo(
      params.host,
      params.port,
      params.rconPassword,
    );
  }

  @Get('servers')
  getServerList() {
    return this.appService.getServerList();
  }
}
