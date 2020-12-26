Discord = require("discord.js");
Enum = require("../Data/enum");
Base = require("../Class/Base");
class Room {
  constructor(name, game, member) {
    this.name = name;
    this.id = member.id;
    this.players = new Discord.Collection();
    this.game = game;
    this.MAX = 0;
    this.MIN = 0;
    this.VoiceChannel = null;
  }

  addPlayer(Player) {
    this.players.set(Player.member.id, Player);
  }

  removePlayer(Player) {
    this.players.delete(Player.member.id);
  }

  setMaxPlayer(int) {
    if (int > 0) this.MAX = int;
  }

  setMinPlayer(int) {
    if (int > 0) this.MIN = int;
  }

  addVoiceChannel(Channel) {
    this.VoiceChannel = Channel;
  }
}

module.exports = Room;
