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
          let games = this.client.Games;
          let result = [];
          if (args.length >= 3) {
            switch (args[2]) {
              case "genre":
                games.forEach((game) => {
                  this.arg(args, 3).forEach((genre) => {
                    if (game.genres.indexOf(genre) > -1) {
                      result.push(game);
                    }
                  });
                });
                result.forEach((game) => {
                  let text = "";
                  game.genres.forEach((genre) => {
                    text = genre + " " + text;
                  });
                  embed.addField(`${game.name} | ${text}`, game.id);
                });
                if (result.length < 0) {
                  embed.setDescription(
                    `${result.length}개의 게임을 찾았습니다.`
                  );
                } else {
                  embed.setDescription("검색된 내용이 없습니다.");
                }

                break;
              case "name":
                games.forEach((game) => {
                  if (game.name.includes(this.arg_text(args, 3))) {
                    console.log("ok");
                    result.push(game);
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
              //game search id색
              case "id":
                game = this.client.getGame(args[3]);
                if (game) {
                  embed.setDescription("해당 게임의 정보입니다.");
                } else {
                  embed.setDescription("검색된 내용이 없습니다.");
                }
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
            if (game) {
              switch (args[3]) {
                case "invite":
                  game.invite = this.arg_text(args, 4);
                  break;
                // game edit id name
                case "name":
                  game.name = this.arg_text(args, 4);
                  break;
                //game edit id genre
                case "genre":
                  switch (args[4]) {
                    // 추가
                    case "add":
                      this.arg(args, 5).forEach((e) => game.addGenre(e));
                      console.log(game);
                      break;
                    // 제거
                    case "remove":
                      this.arg(args, 5).forEach((e) => game.removeGenre(e));
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
              this.client.Games.set(game.id, game);
              embed.setDescription("수정 된 게임의 정보입니다.");
            } else {
              embed.setDescription("검색된 게임이 없습니다.");
            }
          } else {
            // 사용법 embed 작성
            embed = this.usage(command, args, embed);
          }
          this.client.data_save();
          break;
      }
      // game 변수가 있다면 embed 정보 작성
      if (game) {
        if (game.picture) {
          embed.setThumbnail(game.picture);
        }

        embed.addField("Name", game.name, true);

        if (game.genres.length > 0) {
          let text = "";
          game.genres.forEach((genre) => {
            text = genre + " " + text;
          });
          embed.addField("Genre", text, true);
        }

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
      let room;
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

        case "edit":
          if (args.length >= 3) {
            room = this.client.getRoom(args[2]);
            if (game) {
              switch (args[3]) {
                case "invite":
                  room.invite = this.arg_text(args, 4);
                  break;
                // game edit id name
                case "name":
                  room.name = this.arg_text(args, 4);
                  break;
                //game edit id genre
                case "picture":
                  room.game.picture = this.arg_text(args, 4);
                  break;
                case "max":
                  room.MAX = args[4];
                  break;
                default:
                  embed.setDescription("해당 타입은 존재하지 않습니다.");
                  break;
              }
              this.client.Games.set(game.id, game);
              embed.setDescription("수정 된 게임의 정보입니다.");
            } else {
              embed.setDescription("검색된 게임이 없습니다.");
            }
          } else {
            // 사용법 embed 작성
            embed = this.usage(command, args, embed);
          }
          this.client.data_save();
          break;
        case "search":
          let rooms = this.client.Rooms;
          let result = [];
          if (args.length >= 3) {
            switch (args[2]) {
              case "genre":
                rooms.forEach((game) => {
                  this.arg(args, 3).forEach((genre) => {
                    if (room.game.genres.indexOf(genre) > -1) {
                      result.push(room);
                    }
                  });
                });
                result.forEach((room) => {
                  let text = "";
                  room.game.genres.forEach((genre) => {
                    text = genre + " " + text;
                  });
                  embed.addField(`${room.game.name} | ${text}`, room.id);
                });
                if (result.length < 0) {
                  embed.setDescription(
                    `${result.length}개의  방을 찾았습니다.`
                  );
                } else {
                  embed.setDescription("검색된 내용이 없습니다.");
                }

                break;

              case "name":
                rooms.forEach((room) => {
                  console.log(room);
                  if (room.name.includes(this.arg_text(args, 3))) {
                    result.push(room);
                  }
                });
                result.forEach((e) => {
                  embed.addField(e.name, e.id);
                });
                embed.setDescription(
                  `${result.length}개의 방이 검색 되었습니다.`
                );
                if (result.length == 0) {
                  embed.setDescription("검색된 내용이 없습니다.");
                }
                break;
              //game search id
              case "room_id":
                room = this.client.getRoom(args[3]);
                if (room) {
                  embed.setDescription("해당 방의 정보입니다.");
                } else {
                  embed.setDescription("검색된 내용이 없습니다.");
                }
                break;
              default:
                embed.setDescription("해당 타입은 존재하지 않습니다.");
                break;
              case "game_id":
                rooms.forEach((room) => {
                  if (room.id.includes(this.arg_text(args, 3))) {
                    result.push(room);
                  }
                });
                result.forEach((e) => {
                  embed.addField(room.name, room.id);
                });
                embed.setDescription(
                  `${result.length}개의 방이 검색 되었습니다.`
                );
                if (result.length == 0) {
                  embed.setDescription("검색된 내용이 없습니다.");
                }
                break;
            }
          } else {
            embed = this.usage(command, args, embed);
          }
          break;
        case "create":
          if (args.length >= 3) {
            let game = this.client.getGame(args[2]);
            if (game) {
              room = this.client.createRoom(this.arg_text(args,3), game, message.author.id);
              embed.setDescription("생성된 방의 정보입니다.");
            } else {
              embed.setDescription("해당 되는 게임을 찾을 수 없습니다.");
            }
          } else {
            // 사용법 embed 작성
            embed = this.usage(command, args, embed);
          }
          break;
        case "open":
          let player = this.client.getPlayer(message.author.id);
          if (player) {
            let room = player.room;
            let permission = [
              {
                id: this.client.config.guild,
                deny: ["VIEW_CHANNEL,SEND_MESSAGES"],
              },
              {
                id: room.Role.id,
                allow: ["VIEW_CHANNEL,SEND_MESSAGES"],
              },
            ];
            this.client.guild.channels
              .create(room.name, {
                type: "category",
                permissionOverwrites: permission,
              })
              .then((Category) => {
                room.Category;
                this.client.guild.channels
                  .create("채팅", {
                    parent: Category.id,
                    permissionOverwrites: permission,
                  })
                  .then((text) => {
                    room.TextChannel;
                  });
                this.client.guild.channels
                  .create("음성", {
                    type: "voice",
                    parent: Category.id,
                    permissionOverwrites: permission,
                  })
                  .then((voice) => {
                    room.VoiceChannel;
                  });
              });
            console.log(room);
          } else {
            this.usage(command, args, embed);
          }
          break;
        case "join":
          if(!args[2]) args[2] = message.author.id;
          if(args.length >= 2){
            room = this.client.getRoom(args[2]);
            if(room) {
              room.players.set(message.author.id, this.client.createPlayer(room, message.author.name, message.author.id))
            } else {
              embed.setDescription("방이 존재하지 않습니다.")
            }
          }
          break;
        case "players":
          this.client.getRoom(message.author.id).players.forEach(player => {
            embed.addField(player.name,player.id);
          })
          break;
        case "info":
          let p = this.client.getPlayer(message.author.id);
          if(p){
            room = p.room;
          } else {
            embed.setDescription("참여 중인 방이 없습니다.");
          }

          break;
      }

      if (room) {
        embed.addField("Name", room.name, true);
        embed.addField("Party", `${room.players.size}/${room.MAX}`, true);
        embed.addField("Room & Owner ID", room.id);

        if (room.VoiceChannel) {
          embed.addField("VoiceChannel", room.VoiceChannel.name);
        }

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
