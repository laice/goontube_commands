// jynn stuff :unf:

class GOONTUBE_COMMAND {
  constructor(cmd, params, desc, privs) {
    this.cmd = cmd;
    this.desc = desc;
    //this.privs = Array.from(privs);
    this.privs = privs;
    this.params = params;
  }

  min_priv(){
    let privs = this.privs.join("");
    switch(privs) {
      case "111":
        return "User";
      case "011":
        return "Deputy";
      case "001":
        return "Admin";
    }
  }

  c() {
    return "$"+this.cmd;
  }
}

class PARAM {
  constructor(param, desc, privs, opt) {
    this.param = param;
    this.desc = desc;
    //this.privs = Array.from(privs);
    this.privs = privs;
    this.optional = opt || false;
  }
}

let GTC = GOONTUBE_COMMAND;
let GP = PARAM

// privs array [user,dep,mod]
let commands = {
//  "addrandom": new GTC("addrandom", null, "Adds a random video from history.", [0,0,1]),
  "afk": new GTC("afk", { reason: new GP("reason", "the reason for going afk", [1,1,1], true)
                        }, `Set/Un-set 'away' mode. Private messages sent to the user will be received after the user returns.`, [1,1,1]),

  "ban": new GTC("ban", { username: new GP("username", "user to ban", [0,0,1]),
                          reason: new GP("reason", "reason for ban", [0,0,1], true)
                        }, "Ban a user! Probably jynn...", [0,0,1]),

  "banlist": new GTC("banlist", null, "Display a list of users banned from gtubes", [0,0,1]),

  "blacklist": new GTC("blacklist", { yt:new GP("yt", "youtube video", [0,0,1]),
                                      vm:new GP("vm", "vimeo video", [0,0,1]),
                                      dm:new GP("dm", "dailymotion video", [0,0,1])
                                    }, "Prevent a video from being added to the queue.", [0,0,1]),

  "bump": new GTC("bump", { username: new GP("<username>", "user to bump", [0,1,1]),
                            reason: new GP("<reason>", "reason for bumping", [0,1,1])
                          }, `Promote a video in the queue.`, [0,1,1]),

  "delete": new GTC("delete", { absent: new GP("absent", "-absent | removes videos from absent people", [0,0,1]),
                                all: new GP("-all", "-all | removes all videos from the queue",[0,0,1]),
                                dur: new GP("-dur", "-dur <minutes> | all videos longer than specified time", [0,0,1]),
                                num: new GP("-num", "-num <N> <username> | deletes users last N videos", [0,0,1]),
                                title: new GP("-title", "-title <video title> | remove titled video from the queue", [0,0,1])
                              },"Delete the last video you added", [1,1,1]),

  //"demote": new GTC("demote", {username: new GP("<username>", "user to demote", [0,0,1])}, "Revoke powers from a user", [1,1,1]),

  "dice": new GTC('dice', { quantity: new GP("<quantity>", "<quantity> | the number of dice to roll", [1,1,1]),
                            sides: new GP("<sides>", "<N> | N number of dice sides", [1,1,1])
                          }, "Roll some dice of the specific number and amount of sides, shorthand <quantity>d<sides>", [1,1,1]),

  "endpoll": new GTC('endpoll', null, "Close active poll", [0,1,1]),

  "emotes": new GTC('emotes', null, 'Toggle emotes off/on', [0,0,1]),

  "ignore": new GTC('ignore', { username: new GP("<username>", "user to ignore", [1,1,1])
                              }, 'Show your ignore list, or ignore a user by providing a username', [1,1,1]),

  "import": new GTC('import', { playlist: new GP("<playlist>", "playlist to import", [0,0,1])
                              }, 'Import <playlist>', [0,0,1]),

  "kick": new GTC('kick', { username: new GP("<username>", "kick specified user", [0,1,1], true),
                            all: new GP("-all", "kicks all users", [0,1,1], true),
                            unregistered: new GP("-unregistered", "kicks all unnameds", [0,1,1], true),
                            message: new GP("<message>", "reason for kick", [0,1,1], true)
                          }, "kick specific user(s)", [0,1,1]),

  //"list": new GTC('list', {random: new GP("-random", "randomizes the playlist", [0,0,1])}, "randomizes the playlist", [0,0,1]),

  "motd": new GTC('motd', { message: new GP("<message>", "message of the day", [0,0,1])
                          }, "Sets the message of the day", [0,0,1]),

  "permissions": new GTC('permissions', { username: new GP("<username>", "the user this affects", [0,0,1]),
                                          plus: new GP("+", "add a permission to specified user", [0,0,1]),
                                          minus: new GP("-", "remove a permission to specific user", [0,0,1]),
                                          code: new GP("B/E/K/S/P/T", "Add/remove this permission B=bump E=endpoll K=kick S=skip P=poll T=pos", [0,0,1])
                                        }, "Check or set permissions for a specific user", [0,0,1]),

  "poll": new GTC('poll', { title: new GP("<title>", "the title of the poll", [0,1,1]),
                            star: new GP("*", "precedes a poll entry", [0,1,1])
                          }, "Creates a poll with the specified titles and options $poll title *option *option", [0,1,1]),

  "pos": new GTC('pos', { minutes: new GP("<minutes>", "the minutes to skip to", [0,1,1]),
                          seconds: new GP("<seconds>", "the seconds to skip to", [0,1,1], true)
                        }, "Sets the video to the desired position and reloads all client players", [0,1,1]),
  //"promote": new GTC('promote', {username: new GP("<username>", "user to promote", [0,0,1])}, "Grants powers to a user", [0,0,1]),

  "purge": new GTC('purge', { username: new GP("<username>", "the user you wish to purge", [0,0,1])
                            }, "Purge all videos added by you or a specified user (if mod)", [1,1,1]),

  "reboot": new GTC('reboot', null, "Reboot goontube", [0,0,1]),

  "seen": new GTC('seen', { username: new GP("<username>", "the user you are seeking", [1,1,1])
                          }, "See the last time a user logged in", [1,1,1]),

  "seppuku": new GTC('seppuku', null, "Ban yourself for 24 hours. HIGHLY RECOMMENDED", [1,1,1]),

  "setskip": new GTC('setskip', { percent: new GP("<%>", "the new percentage required to skip", [0,1,1])
                                }, "Set the skip percentage. Default 50", [0,1,1]),

  "skip": new GTC('skip', null, "Skip current video playing", [0,1,1]),

  "tban": new GTC('tban', { username: new GP("<username>", "user to ban", [0,0,1]),
                            hours: new GP("<hours>", "hours to ban", [0,0,1]),
                            reason: new GP("<reason>", "reason for ban", [0,0,1], true)
                          }, "Ban a user for the specified amount of HOURS", [0,0,1]),

  "unban": new GTC('unban', { username: new GP("<username>", "user to unban HINT: jynn", [0,0,1])
                            }, "Unbans specified user", [0,0,1]),

  "whisper": new GTC('whisper', { username: new GP("<username>", "user to whisper to", [1,1,1]),
                                  message: new GP("<message>", "message to whisper", [1,1,1])
                                }, "Whisper a message to a user", [1,1,1])

}

module.exports = commands;
