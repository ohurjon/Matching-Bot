Discord = require("discord.js");

Config = require("../Data/config.json");

Room = require("../Class/Room");

Events = require("../Events/Events.js");

class Ohurjon extends Discord.Client {
  constructor(options) {
    super(options);
    this.config = Config;
    this.Rooms = new Discord.Collection();
  }

  getRoom(id){
    return this.Rooms.get(id);
  }
  createRoom(name,game,member){
    return this.Rooms.set(member.id,new Room(name,game,member));
  }

  removeRoom(member){
    this.Rooms.delete(member.id);
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
