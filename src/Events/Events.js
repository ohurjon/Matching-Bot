Event = require("../Class/Event.js");
Commands = require("../Commands/Commands");
class Events extends Event {
  constructor(client) {
    super(client);
  }
  list = {
    ready: () => {
      let client = this.client
      let config = client.config
      console.log(client.user.tag);
      client.user.setActivity(config.activity.name,config.activity.options);
    },
    message: (message) => {
      if (message.content.startsWith(this.client.config.prefix)) {
        let args = message.content.split(" ");
        let command = args[0].replace(this.client.config.prefix, "");
        let cmd = new Commands(this.client);
        let commands = cmd.keys;
        if (commands.includes(command)) {
          cmd.run(command, message, args);
        }
      }
    },
  };

  keys = Object.keys(this.list);
}

module.exports = Events;
