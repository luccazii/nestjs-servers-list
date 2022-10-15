import { Injectable } from '@nestjs/common';
var Rcon = require('rcon')

@Injectable()
export class RconFetcherService {
  constructor() {}

  getServerDataFromServer(ip, port, rconPassword) {
    return this.sendRconCommand(ip, port, rconPassword, 'sm_json_clients')
  }

  sendRconCommand(ip, port, password, command) {
    let conn = new Rcon(ip, port, password);
    // let conn = new Rcon('18.230.115.205', '27015', 'changeme');

    return new Promise(resolve => {
      conn
          .on('auth', () => conn.send(command))
          .on('end', () => process.exit())
          .on('response', data => !data || resolve(JSON.parse(data))) // the event is fired when constructed, so lets check if data is not empty

      setTimeout(() => resolve(null), 600)

      conn.connect();
    });
  }
}
