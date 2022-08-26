import { Controller, Get, Param } from '@nestjs/common';
import { RconFetcherService } from './rconFetcher.service';

@Controller()
export class RconFetcherController {
  constructor(private readonly rconFetcherService: RconFetcherService) {}

  @Get('rcon-info/:host/:port/:rcon_password')
  getServerInfo(@Param() params) {
    console.log('hey');
    return this.rconFetcherService.getServerDataFromServer(
      params.host,
      params.port,
      params.rcon_password,
    );
  }
}
