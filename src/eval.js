Ohurjon = require("./Class/Client.js");

client = new Ohurjon();

client.start();

let game = client.createGame("ohurjon",["Rythm"]);

console.log(game);