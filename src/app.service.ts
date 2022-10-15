import { Injectable, Inject, CACHE_MANAGER } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { RconFetcherService } from 'src/models/rconFetchers/rconFetcher.service';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const Gamedig = require('gamedig');

@Injectable()
export class AppService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async getHello() {
    await this.cacheManager.set('testing', 'working', { ttl: 100000 });

    const res = await this.cacheManager.get('testing');
    console.log(res); // logs "bar2"

    return 'APP is working, getting message from redis caching: ' + res;
  }

  async getServerInfo(ip, port, rconPassword = null) {
    const cachingKey = ip + ':' + port;

    if (await this.cacheManager.get(cachingKey)) {
      console.log('cached data: ');
      return this.cacheManager.get(cachingKey);
    } else {
      console.log('getServerDataFromServer');
      const freshServerData = await this.getServerDataFromServer(
        ip,
        port,
        rconPassword,
      );
      this.cacheManager.set(cachingKey, freshServerData, { ttl: 10 });

      return freshServerData;
    }
  }

  async getServerDataFromServer(ip, port, rconPassword = 'changeme') {
    return await Gamedig.query({
      type: 'csgo',
      host: ip,
      port: port,
    }).then(async (serverData) => {
      if (rconPassword) {
        serverData.players =
          await new RconFetcherService().getServerDataFromServer(
            ip,
            port,
            rconPassword,
          );
      }
      this.pushServerToList(serverData);
      return serverData;
    });
  }

  async pushServerToList(serverData) {
    const newAllServers = (await this.cacheManager.get('all')) || [];
    newAllServers.push(serverData);

    this.cacheManager.set('all', newAllServers, { ttl: 100000 });

    return newAllServers;
  }

  async getServerList() {
    return this.cacheManager.get('all') || [];
  }
}
