Discord = require("discord.js");
Base = require("../Class/Base");

class Player {
  constructor(game, member) {
    this.room = null;
    this.member = member;
    this.id = member.id;
  }
}

module.exports = Player;