Base = require("./Base");

Enum = require("../Data/enum")

class Game extends Base {
    constructor(props) {
        super(props);
        this.name = name;
        this.genre = genre;
    }

    addGenre(Key) {
        if (Object.keys(Enum.Genre).includes(Key)) {
            let Genre = Enum.Genre[Key];
            if (!this.genre.includes(Genre)) this.genre.join();
        }
    }

}