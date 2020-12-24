Command = require("../Class/Command.js");
class Commands extends Command {
  constructor(client) {
    super(client);
  }

  run(message) {
      this.
  }

  get() {
    return {
      hello: (args) => {
        console.log(this.client.user.discriminator);
      },
      message: (message) => {},
    };
  }
}

module.exports = new Commands();
