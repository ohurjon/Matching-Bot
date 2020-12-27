Base = require("./Base");

Enum = require("../Data/enum");

Util = require("../Class/Util");

class Game {
  constructor(name, genres, id, picture) {
    this.name = name;
    this.id = id;
    this.genres = [];
    this.picture = picture;
    if (genres) genres.forEach((genre) => this.addGenre(genre));
  }

  addGenre(Key) {
    if (Object.keys(Enum.Genre).includes(Key)) {
      let Genre = Enum.Genre[Key];
      if (!this.genres.includes(Genre)) {
        this.genres.push(Genre);
      }
    }
  }

  removeGenre(Key) {
    if (Object.keys(Enum.Genre).includes(Key)) {
      let Genre = Enum.Genre[Key];
      let Genres = this.genres
      if (this.genres.includes(Genre)) {
        Genres.splice(Genres.findIndex(e => e == Genre),1);
      }
    }
  }
}

module.exports = Game;
