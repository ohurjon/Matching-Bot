Discord = require("discord.js");
Enum = require("../Data/enum");
Base = require("../Class/Base")
class Room extends Base{
  constructor(client,name,game) {
    super(client);
    this.name = name;
    this.players = new Discord.Collection();
    this.game = game
    this.MAX = 0;
    this.MIN = 0;
    this.VoiceChannel = null;
  }

  setName(name) {
    this.name = name
  }
  addPlayer(Player) {
    this.players.set(Player.member.id, Player);
  }

  setMaxPlayer(int) {
    if (int > 0) this.MAX = int;
  }

  setMinPlayer(int){
    if(int > 0) this.MIN = int;
  }

  addVoiceChannel(Channel) {
    this.VoiceChannel = Channel;
  }
}
