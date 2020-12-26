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
    eval: (message, args) => {
      let text = message.content.replace(`!eval `, "");

      message.channel.send(require("util").inspect(eval(text), { depth: 0 }));
    },

    test: (message, args) => {
      message.channel.send("테스트");
    },

    help: (message, args) => {
      let embed = new Embed();
      embed.setAuthor("매칭봇", this.client.user.avatarURL());
      CommandList.forEach((Command) => {
        embed.addField(Command.name, Command.description);
      });
      message.channel.send(embed);
    },

    game: (message, args) => {
      if(args.length == 1) {

      }
    },

    room: (message, args) => {
      if (args.length == 1) {
        let embed = new Embed();
        //embed.setTitle("dASd")
        embed.setAuthor("매칭봇", this.client.user.avatarURL());
        embed.setDescription("사용법 : room create <>");
        embed.setFooter(message.member.displayName, message.author.avatarURL());
        //embed.setFooter("")
        message.channel.send(embed);
      } else {
        if (args[1] == "create") {

          message.channel.send();
        }

        if (args[1] == "addGenre") {
          let room = this.client.getRoom(message.author.id);
          room.game.addGenre("FPS");
          message.channel.send(JSON.stringify(room));
        }
      }
    },
  };

  keys = Object.keys(this.list);
}

module.exports = Commands;
