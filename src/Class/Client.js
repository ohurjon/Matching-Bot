Discord = require("discord.js");

Config = require("../Data/config.json");

Events = require("../Events/Events.js");

class Ohurjon extends Discord.Client {
  constructor(options) {
    super(options);
    this.config = Config;
  }

  start() {
    this.login(this.config.token);
    this.event_reload();
  }

  event_reload() {
    Events.keys.forEach((key) => {
      this.on(key, Events.list[key].bind(this));
    });
  }
}

module.exports = Ohurjon;
