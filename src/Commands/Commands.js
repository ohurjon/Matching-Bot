Command = require("../Class/Command");
Room = require("../Class/Room.js");
Game = require("../Class/Game.js");
CommandList = require("../Data/commands.json");
Embed = require("discord.js").MessageEmbed;
class Commands extends Command {
  constructor(client) {
    super(client);
  }

  run(command, message, args) {
    this.list[command](command, message, args);
  }

  usage(command, args, embed) {
    let result = [];

    CommandList.find((element) => element.name == command).list.forEach((e) => {
      if (e.name == args[1]) {
        result.push(e);
      }
    });

    result.forEach((e) => {
      embed.setDescription("사용법");
      embed.addField(this.client.config.prefix + e.usage, e.description);
    });

    return embed;
  }

  arg_text(args, int) {
    for (let i = 0; i < int; i++) {
      args.shift();
    }

    let text = args[0];

    args.shift();

    args.forEach((arg) => {
      text = text + " " + arg;
    });
    return text;
  }

  arg(args, int) {
    for (let i = 0; i < int; i++) {
      args.shift();
    }
    return args;
  }

  list = {
    ///////////////////////////////////////
    test: (command, message, args) => {
      message.channel.send("테스트");
    },
    //////////////////////////////////////////////////
    help: (command, message, args) => {
      let embed = new Embed();
      let Keys = [];
      // 기본 Author
      embed.setAuthor("매칭봇", this.client.user.avatarURL());

      // 커맨드의 Key 리스트
      CommandList.forEach((Command) => {
        Keys.push(Command.name);
      });

      // 상세 명령어가 없으면 help로 전환
      if (!args[1]) args[1] = "help";

      // help 임베드
      if (Keys.includes(args[1])) {
        let Command = CommandList.find((element) => element.name == args[1]);
        Command.list.forEach((element) => {
          embed.addField(
            this.client.config.prefix + element.usage,
            element.description
          );
        });
      } else {
        embed.setDescription("해당 명령어는 존재하지 않습니다.");
      }
      // 기본 Footer & Embed 전송
      embed.setFooter(
        `${message.member.displayName}`,
        message.author.avatarURL()
      );
      message.channel.send(embed);
    },
    ////////////////////////////////////////////////////////////////////
    game: (command, message, args) => {
      let embed = new Embed();
      let game;
      //기본 Author
      embed.setAuthor("매칭봇", this.client.user.avatarURL());

      // 상세 명령어가 없으면 help 전환
      if (!args[1]) args[1] = "help";

      // 상세 명령어 switch
      switch (args[1]) {
        // game help
        case "help":
          let Command = CommandList.find((element) => element.name == command);
          Command.list.forEach((element) => {
            embed.addField(
              this.client.config.prefix + element.usage,
              element.description
            );
          });
          break;
        //game search
        case "search":
          if (args.length >= 3) {
            switch (args[2]) {
              case "name":
                let games = this.client.Games;
                let result = [];
                games.forEach((e) => {
                  if (e.name.includes(this.arg_text(args, 3))) {
                    console.log("ok");
                    result.push(e);
                  }
                });
                result.forEach((e) => {
                  embed.addField(e.name, e.id);
                });
                embed.setDescription(
                  `${result.length}개의 게임이 검색 되었습니다.`
                );
                if (result.length == 0) {
                  embed.setDescription("검색된 내용이 없습니다.");
                }
                break;
              //game search id
              case "id":
                game = this.client.getGame(args[3]);
                embed.setDescription("해당 게임의 정보입니다.");
                break;
              default:
                embed.setDescription("해당 타입은 존재하지 않습니다.");
                break;
            }
          } else {
            embed = this.usage(command, args, embed);
          }
          break;
        // game create
        case "create":
          if (args.length >= 3) {
            game = this.client.createGame(this.arg_text(args, 2));
            embed.setDescription("생성된 게임의 정보입니다.");
          } else {
            // 사용법 embed 작성
            embed = this.usage(command, args, embed);
          }
          break;
        // game edit
        case "edit":
          if (args.length >= 3) {
            game = this.client.getGame(args[2]);
            switch (args[3]) {
              // game edit name
              case "name":
                game.name = this.arg_text(args, 4);
                break;
              //game edit genre
              case "genre":
                switch (args[3]) {
                  // 추가
                  case "add":
                    this.arg(args, 3).forEach((e) => game.addGenre(e));
                    break;
                  // 제거
                  case "remove":
                    this.arg(args, 3).forEach((e) => game.removeGenre(e));
                    break;
                }
                break;
              case "picture":
                game.picture = this.arg_text(args, 4);
                break;
              default:
                embed.setDescription("해당 타입은 존재하지 않습니다.");
                break;
            }
            if(game) {
              this.client.Games.set(game.id, game);
              embed.setDescription("수정 된 게임의 정보입니다.");
            }

          } else {
            // 사용법 embed 작성
            embed = this.usage(command, args, embed);
          }
          break;
      }
      // game 변수가 있다면 embed 정보 작성
      if (game) {
        if (game.picture) {
          embed.setThumbnail(game.picture);
        }
        embed.addField("Name", game.name);
        embed.addField("ID", game.id);
      }

      // 기본 Footer & Embed 전송
      embed.setFooter(
        `${message.member.displayName}`,
        message.author.avatarURL()
      );
      message.channel.send(embed);
    },
    ////////////////////////////////////
    room: (command, message, args) => {
      let embed = new Embed();
      embed.setAuthor("매칭봇", this.client.user.avatarURL());

      if (!args[1]) args[1] = "help";

      switch (args[1]) {
        case "help":
          let Command = CommandList.find((element) => element.name == command);
          Command.list.forEach((element) => {
            embed.addField(
              this.client.config.prefix + element.usage,
              element.description
            );
          });
          break;
        case "create":
          let arg;
          if (args.length >= 4) {
            for (let i = 0; i < 3; i++) {
              arg = args.shift();
            }
            let room = this.client.createRoom(args[2], arg, message.member);
            message.channel.send(JSON.stringify(room));
          } else {
            embed = this.usage(command, args, embed);
          }
          break;
        case "join":
          break;
        case "players":
          break;
        case "info":
          break;
      }

      embed.setFooter(
        `${message.member.displayName}`,
        message.author.avatarURL()
      );
      message.channel.send(embed);
    },
  };

  keys = Object.keys(this.list);
}

module.exports = Commands;
