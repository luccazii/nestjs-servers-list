import { Injectable, Inject, CACHE_MANAGER } from '@nestjs/common';
import { Cache } from 'cache-manager';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const Gamedig = require('gamedig');

@Injectable()
export class AppService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async getHello() {
    await this.cacheManager.set('foo2', 'bar3', { ttl: 100000 });

    const res = await this.cacheManager.get('foo2');
    console.log(res); // logs "bar2"

    return 'Hello World lol: ' + res;
  }

  async getServerInfo(ip, port) {
    const cachingKey = ip + ':' + port;

    if (await this.cacheManager.get(cachingKey)) {
      console.log('cached data: ');
      return this.cacheManager.get(cachingKey);
    } else {
      console.log('getServerDataFromServer');
      const freshServerData = await this.getServerDataFromServer(ip, port);
      this.cacheManager.set(cachingKey, freshServerData, { ttl: 100000 });

      return freshServerData;
    }
  }

  async getServerDataFromServer(ip, port) {
    return await Gamedig.query({
      type: 'csgo',
      host: ip,
      port: port,
    }).then((serverData) => {
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
