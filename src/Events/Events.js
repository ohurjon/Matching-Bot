Event = require("../Class/Event.js")
Commands = require("../Commands/Commands.js")
class Events extends Event {
    constructor(client) {
        super(client);
    }
    get() {
        return {
                "ready" : () => {
                    console.log(this.client.user.discriminator);
                },
                "message" : (message) => {
                    if (message.content.startsWith(this.client.config.prefix)){
                        let args = message.content.split(" ")
                        let command = args[0].replace(this.client.config.prefix,"");
                        let commands = Object.keys(Commands.get());
                        if( commands.indexOf(command) < 0 ){
                            Commands.run(command)
                        } else {
                            return "없"
                        }
                    }



                }


        }
    }



}