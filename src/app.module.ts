import { CacheModule, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import * as redisStore from 'cache-manager-redis-store';
import { RconFetcherModule } from './models/rconFetchers/rconFetcher.module';

@Module({
  imports: [
    CacheModule.register({
      store: redisStore,
      host: 'localhost',
      port: 6379,
    }),
    RconFetcherModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
