Discord = require("discord.js");
Enum = require("../Data/enum");
Base = require("../Class/Base");
class Room {
  constructor(name, game, id) {
    this.name = name;
    this.id = id;
    this.players = new Discord.Collection();
    this.game = game;
    this.MAX = 5;
    /**this.Category = null;
    this.TextChannel = null;
    this.VoiceChannel = null;
    this.Role = null;**/
    this.invite = null;
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

  /**addVoiceChannel(Channel) {
    this.VoiceChannel = Channel;
  }**/
}

module.exports = Room;
