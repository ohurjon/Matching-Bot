Command = require("../Class/Command");
Room = require("../Class/Room.js");
Game = require("../Class/Game.js");
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
    room: (message, args) => {
      if (args.length == 1) {
        message.channel.send("사용법 : room create <> ");
      } else {
        if (args[1] == "create") {
          let room = this.client.createRoom(
            "Test",
            new Game("Test", ["Rythm", "RPG", "Sex"]),
            message.member
          );
          message.channel.send(JSON.stringify(room));
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
