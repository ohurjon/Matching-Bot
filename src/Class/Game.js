Base = require("./Base");

Enum = require("../Data/enum");

Util = require("../Class/Util");

class Game {
  constructor(name, genres) {
    this.name = name;
    this.id = Util.createGuid();
    this.genres = [];
    genres.forEach((genre) => this.addGenre(genre));
  }

  addGenre(Key) {
    if (Object.keys(Enum.Genre).includes(Key)) {
      let Genre = Enum.Genre[Key];
      if (!this.genres.includes(Genre)) {
        this.genres.push(Genre);
      }
    }
  }
}

module.exports = Game;
