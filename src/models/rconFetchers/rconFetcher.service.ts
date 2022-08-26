import { Injectable } from '@nestjs/common';
var Rcon = require('rcon')

@Injectable()
export class RconFetcherService {
  constructor() {}

  async getServerDataFromServer(ip, port, rconPassword) {
    return this.sendRconCommand(ip, port, rconPassword, 'status');
  }

  sendRconCommand(ip, port, password, command) {
    // let conn = new Rcon(ip, port, password, {}); // todo implement it properly
    let conn = new Rcon('15.228.222.53', '27015', 'temp321');

    conn
        .on('auth', () => conn.send(command))
        .on('response', messageString => console.log(messageString))
        .on('end', () => process.exit())

    conn.connect();
  }
}
