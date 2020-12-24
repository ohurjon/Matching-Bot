Discord = require("discord.js");

Config = require("../Data/config.json");

class Ohurjon extends Client {
    constructor() {
        super();
        this.config = Config;
    }

    start() {
        this.client.login(this.config.token)
        this.event_reload()
    }

    event_reload(){

    }
}

module.exports = new Ohurjon;