Config = require("./Data/config.json");
Discord = require("discord.js");
Client = new Discord.Client();

Client.login(Config.token);

Client.on("ready", () => {
  console.log(Client.user.tag);
});
