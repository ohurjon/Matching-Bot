Command = require("../Class/Command")
class Commands extends Command {
  constructor(client) {
    super(client);
  }

  run(command,message,args) {
    this.list[command](message,args);
  }

  list = {
      test : (message,args) => {
          message.channel.send("테스트");
      },
      room : (message,args) => {

      }
  }

  keys = Object.keys(this.list);

}

module.exports = Commands;
