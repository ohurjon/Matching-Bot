Discord = require("discord.js");

Config = require("../Data/config.json");

Room = require("../Class/Room");

Game = require("../Class/Game");

Events = require("../Events/Events.js");

class Ohurjon extends Discord.Client {
  constructor(options) {
    super(options);
    this.config = Config;
    this.Rooms = new Discord.Collection();
    this.Games = new Discord.Collection();
  }

  getRoom(id) {
    return this.Rooms.get(id);
  }

  createRoom(name, game, member) {
    let room = new Room(name, game, member);
    this.Rooms.set(member.id, room);
    return room;
  }

  removeRoom(member) {
    this.Rooms.delete(member.id);
  }

  getGame(id){
    return this.Games.get(id);
  }

  createGame(name, genres, picture) {
      let game = new Game(name, genres,picture);
      this.Games.set(game.id, game);
      return game;
  }

  removeGame(id){
    return this.Games.delete(id);
  }

  start() {
    this.login(this.config.token);
    this.event_reload();
  }

  event_reload() {
    Events = new Events(this);
    Events.keys.forEach((key) => {
      this.on(key, Events.list[key].bind(this));
    });
  }
}

module.exports = Ohurjon;
