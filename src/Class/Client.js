Player = require("./Player");

File = require("fs");
Discord = require("discord.js");

Config = require("../Data/config.json");

Room = require("../Class/Room");

Game = require("../Class/Game");

Events = require("../Events/Events.js");

Util = require("../Class/Util");

class Ohurjon extends Discord.Client {
  constructor(options) {
    super(options);
    this.config = Config;
    this.guild = this.guilds.fetch(this.config.guild);
    this.Rooms = new Discord.Collection();
    this.Games = new Discord.Collection();
    this.Players = new Discord.Collection();
  }

 /** async createRole(name) {
    let Guild = await this.guilds.fetch(this.config.guild)
    let Role = await Guild.roles.create({ data: { name: name } })
    return await Role;
  }**/

  getRoom(id) {
    return this.Rooms.get(id);
  }

  createPlayer(room,name, id) {
    let player = new Player(room, name,id);
    this.Players.set(id, player);
    this.data_save();
    return player;
  }

  getPlayer(id) {
    return this.Players.get(id);
  }

  removePlayer(player) {
    player.room.players.delete(player.member.id);
    this.Players.delete(player.member.id);
  }

  createRoom(name, game, id) {
    let room = new Room(name, game, id);
    this.Rooms.set(id, room);
    this.data_save();
    return room;
  }

  removeRoom(member) {
    this.Rooms.delete(member.id);
    this.data_save();
  }

  getGame(id) {
    return this.Games.get(id);
  }

  createGame(name, genres, id, picture) {
    if(!id) id = Util.createGuid();
    let game = new Game(name, genres,id, picture);
    this.Games.set(id, game);
    this.data_save();
    return game;
  }

  removeGame(id) {
    return this.Games.delete(id);
    this.data_save();
  }

  start() {
    this.login(this.config.token);
    this.event_reload();
    this.data_load();
  }

  data_save(){
      let rooms = [];
      this.Rooms.forEach(room => {
          room.game = room.game.id
          rooms.push(room);
      })
      let players = [];
      this.Players.forEach(player => {
          player.room = player.room.id
          rooms.push(players);
      })
    Util.write(__dirname.replace("/Class","/Data/games.json"),JSON.stringify(this.Games),err => {if(err)console.log(err)});
    Util.write(__dirname.replace("/Class","/Data/rooms.json"),JSON.stringify(rooms),err => {if(err)console.log(err)});
    Util.write(__dirname.replace("/Class","/Data/players.json"),JSON.stringify(players),err => {if(err)console.log(err)});
  }

  data_load() {
    let games = require("../Data/games.json")
    let rooms =  require("../Data/rooms.json")
    let players =  require("../Data/players.json")
    games.forEach(game => {
      this.Games.set(game.id,new Game(game.name,game.genres,game.id,game.picture))
    })
    rooms.forEach(room => {
      this.Rooms.set(room.id,new Room(this,room.name,this.getGame(room.game),room.member))
    })
    players.forEach(player => {
      this.Players.set(player.id,new Player(player.room,player.id))
    })
  }

  event_reload() {
    Events = new Events(this);
    Events.keys.forEach((key) => {
      this.on(key, Events.list[key].bind(this));
    });
  }
}

module.exports = Ohurjon;
