import express from 'express';
import http from 'http';
import { Server } from "socket.io";
import * as path from 'path';
import { fileURLToPath } from 'url';
import Player from './Player.js';


export default class Space {
  constructor(port) {
    this.port = port;
    this.app = express();
    this.server = http.createServer(this.app);
    this.io = new Server(this.server);
    this.players = [];
    this.objects = [];
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    this.app.use(express.static(path.join(__dirname, '../client')))

    // Local to implementation rather than library
    this.app.use('/assets', express.static('assets'));
  }

  initialize() { }
  playerJoined(p) { }
  playerLeft(p) { }
  update() { }

  addObject(object) {
    this.objects.push(object);
  }

  start(callback) {

    this.io.on('connection', (socket) => {
      let p = new Player();
      this.playerJoined(p);
      this.players.push(p);
      socket.on('disconnect', () => {
        this.playerLeft(p);
        this.players = this.players.filter((player) => player.id !== p.id);
      });
    });

    this.initialize();
    setInterval(() => {
      this.update();
      this.io.emit('sync', { objects: this.objects });
    }, 1000 / 60);
    this.server.listen(this.port, callback);
  }
}