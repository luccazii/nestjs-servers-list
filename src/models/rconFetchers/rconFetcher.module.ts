import { Module } from '@nestjs/common';
import { RconFetcherController } from './rconFetcher.controller';
import { RconFetcherService } from './rconFetcher.service';

@Module({
  controllers: [RconFetcherController],
  providers: [RconFetcherService],
})
export class RconFetcherModule {}
