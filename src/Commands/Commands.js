Command = require("../Class/Command");
Room = require("../Class/Room.js");
Game = require("../Class/Game.js");
CommandList = require("../Data/commands.json");
Embed = require("discord.js").MessageEmbed;
class Commands extends Command {
  constructor(client) {
    super(client);
  }

  run(command, message, args) {
    this.list[command](message, args);
  }

  list = {
    test: (message, args) => {
      message.channel.send("테스트");
    },

    help: (message, args) => {
      let embed = new Embed();

      embed.setAuthor("매칭봇", this.client.user.avatarURL());

      if (args.length == 1) {
        CommandList.forEach((Command) => {
          if (Command.list) {
            embed.addField(
              Command.name,
              Command.list.find((element) => element.name == "help").description
            );
          }
        });
      } else {
        CommandList.forEach((Command) => {
          if (Command.name == args[1]) {
            Command.list.forEach((element) => {
              embed.addField(element.usage, element.description);
            });
          }
        });
      }
      message.setFooter(message.timestamp)
      message.channel.send(embed);
    },

    game: (message, args) => {
      if (args.length == 1) {
        let embed = new Embed();
        //embed.setTitle("dASd")
        embed.setAuthor("매칭봇", this.client.user.avatarURL());
        embed.setDescription("사용법 : room help");
        //embed.addField();
        embed.setFooter(message.member.displayName, message.author.avatarURL());
      }
    },

    room: (message, args) => {
      if (args.length == 1) {
        let embed = new Embed();
        embed.setAuthor("매칭봇", this.client.user.avatarURL());
        embed.setDescription("사용법 : room help");
        embed.setFooter(message.member.displayName, message.author.avatarURL());
        message.channel.send(embed);
      } else {
        if (args[1] == "create") {
          message.channel.send();
        }
        if (args[1] == "help") {
        }
      }
    },
  };

  keys = Object.keys(this.list);
}

module.exports = Commands;
