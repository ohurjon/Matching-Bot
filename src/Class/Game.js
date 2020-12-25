Base = require("./Base");

Enum = require("../Data/enum");

class Game {
  constructor(name, genres) {
    this.name = name;
    this.genres = [];

    genres.forEach(genre => this.addGenre(genre));
  }

  addGenre(Key) {
    if (Object.keys(Enum.Genre).includes(Key)) {
      let Genre = Enum.Genre[Key];
      if (!this.genres.includes(Genre)) this.genres.join(Genre);
    }
  }
}

module.exports = Game;
