// a jynn joint

class GOONTUBE_CMD {
  constructor(cmd, params, desc, privs) {
    this.cmd = cmd;
    this.desc = desc;
    this.privs = privs;
    this.params = params;

    this.c = "$" + cmd;
    this.min_priv = this.min_priv();
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

}

class GOONTUBE_PARAM {
  constructor(param, desc, privs, opt) {
    this.param = param;
    this.desc = desc;
    //this.privs = Array.from(privs);
    this.privs = privs;
    this.optional = opt || false;
    this.min_priv = this.min_priv();
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
}

let GTC = GOONTUBE_CMD;
let GP = GOONTUBE_PARAM;

// privs array [user,dep,mod]
class GOONTUBE_COMMANDS{

  constructor() {

    //  this.addrandom = new GTC("addrandom", null, "Adds a random video from history.", [0,0,1]);
    this.afk = new GTC("afk", { reason: new GP("[reason]", "the reason for going afk", [1,1,1], true)
                              }, `Set/Un-set 'away' mode. Private messages sent to the user will be received after the user returns.`, [1,1,1]);

    this.ban = new GTC("ban", { username: new GP("[username]", "user to ban", [0,0,1]),
                            reason: new GP("[reason]", "reason for ban", [0,0,1], true)
                          }, "Ban a user! Probably jynn...", [0,0,1]);

    this.banlist = new GTC("banlist", null, "Display a list of users banned from gtubes", [0,0,1]);

    this.blacklist = new GTC("blacklist", { yt:new GP("yt", "youtube video", [0,0,1]),
                                        vm:new GP("vm", "vimeo video", [0,0,1]),
                                        dm:new GP("dm", "dailymotion video", [0,0,1])
                                      }, "Prevent a video from being added to the queue.", [0,0,1]);

    this.bump = new GTC("bump", { username: new GP("[username]", "user to bump", [0,1,1]),
                              reason: new GP("[reason]", "reason for bumping", [0,1,1])
                            }, `Promote a video in the queue.`, [0,1,1]);

    this.delete = new GTC("delete", { absent: new GP("-absent", "removes videos from absent people", [0,0,1]),
                                  all: new GP("-all", "removes all videos from the queue",[0,0,1]),
                                  dur: new GP("-dur [minutes]", "all videos longer than specified time", [0,0,1]),
                                  num: new GP("-num [N] [username] ", "deletes users last N videos", [0,0,1]),
                                  title: new GP("-title [video title]", "remove titled video from the queue", [0,0,1])
                                },"Delete the last video you added", [1,1,1]);

    //this.demote = new GTC("demote", {username: new GP("<username>", "user to demote", [0,0,1])}, "Revoke powers from a user", [1,1,1]);

    this.dice = new GTC('dice', { quantity: new GP("[quantity]", "the number of dice to roll", [1,1,1]),
                              sides: new GP("[sides]", "N number of dice sides", [1,1,1])
                            }, "Roll some dice of the specific number and amount of sides, shorthand [quantity]d[sides]", [1,1,1]);

    this.endpoll = new GTC('endpoll', null, "Close active poll", [0,1,1]);

    this.emotes = new GTC('emotes', null, 'Toggle emotes off/on', [0,0,1]);

    this.ignore = new GTC('ignore', { username: new GP("[username]", "user to ignore", [1,1,1])
                                    }, 'Show your ignore list, or ignore a user by providing a username', [1,1,1]);

    this.import = new GTC('import', { playlist: new GP("[playlist]", "playlist to import", [0,0,1])
                                    }, 'Import [playlist]', [0,0,1]);

    this.kick = new GTC('kick', { username: new GP("[username]", "kick specified user", [0,1,1], true),
                              all: new GP("-all", "kicks all users", [0,1,1], true),
                              unregistered: new GP("-unregistered", "kicks all unnameds", [0,1,1], true),
                              message: new GP("[message]", "reason for kick", [0,1,1], true)
                            }, "kick specific user(s)", [0,1,1]);

    //this.list = new GTC('list', {random: new GP("-random", "randomizes the playlist", [0,0,1])}, "randomizes the playlist", [0,0,1]);

    this.motd = new GTC('motd', { message: new GP("[message]", "message of the day", [0,0,1])
                                }, "Sets the message of the day", [0,0,1]);

    this.permissions = new GTC('permissions', { username: new GP("[username]", "the user this affects", [0,0,1]),
                                            plus: new GP("+", "add a permission to specified user", [0,0,1]),
                                            minus: new GP("-", "remove a permission to specific user", [0,0,1]),
                                            code: new GP("B/E/K/S/P/T", "Add/remove this permission B=bump E=endpoll K=kick S=skip P=poll T=pos", [0,0,1])
                                          }, "Check or set permissions for a specific user", [0,0,1]);

    this.poll = new GTC('poll', { title: new GP("[title]", "the title of the poll", [0,1,1]),
                              star: new GP("*", "precedes a poll entry", [0,1,1])
                            }, "Creates a poll with the specified titles and options $poll title *option *option", [0,1,1]);

    this.pos = new GTC('pos', { minutes: new GP("[minutes]", "the minutes to skip to", [0,1,1]),
                            seconds: new GP("[seconds]", "the seconds to skip to", [0,1,1], true)
                          }, "Sets the video to the desired position and reloads all client players", [0,1,1]);
    //this.promote = new GTC('promote', {username: new GP("<username>", "user to promote", [0,0,1])}, "Grants powers to a user", [0,0,1]);

    this.purge = new GTC('purge', { username: new GP("[username]", "the user you wish to purge", [0,0,1])
                                  }, "Purge all videos added by you or a specified user (if mod)", [1,1,1]);

    this.reboot = new GTC('reboot', null, "Reboot goontube", [0,0,1]);

    this.seen = new GTC('seen', { username: new GP("[username]", "the user you are seeking", [1,1,1])
                                }, "See the last time a user logged in", [1,1,1]);

    this.seppuku = new GTC('seppuku', null, "Ban yourself for 24 hours. HIGHLY RECOMMENDED", [1,1,1]);

    this.setskip = new GTC('setskip', { percent: new GP("[%]", "the new percentage required to skip", [0,1,1])
                                      }, "Set the skip percentage. Default 50", [0,1,1]);

    this.skip = new GTC('skip', null, "Skip current video playing", [0,1,1]);

    this.tban = new GTC('tban', { username: new GP("[username]", "user to ban", [0,0,1]),
                              hours: new GP("[hours]", "hours to ban", [0,0,1]),
                              reason: new GP("[reason]", "reason for ban", [0,0,1], true)
                            }, "Ban a user for the specified amount of HOURS", [0,0,1]);

    this.unban = new GTC('unban', { username: new GP("[username]", "user to unban HINT: jynn", [0,0,1])
                                  }, "Unbans specified user", [0,0,1]);

    this.whisper = new GTC('whisper', { username: new GP("[username]", "user to whisper to", [1,1,1]),
                                    message: new GP("[message]", "message to whisper", [1,1,1])
                                  }, "Whisper a message to a user", [1,1,1]);
  }

  priv_cmds(level, fullname) {
    let keys = Object.keys(this);
    let cmds;
    if(fullname) {
      cmds = [];
    } else {
      cmds = {};
    }

    for(let i = 0; i < keys.length; i++) {
      if(this[keys[i]].min_priv === level) {
        if(fullname) {
          cmds.push(this[keys[i]].c);
        } else {
          cmds[keys[i]] = this[keys[i]];
        }
      }
    }

    return cmds;
  }

  // inclusive priv commands
  priv_cmds_i(level, fullname) {
    let cmds;
    if(fullname) {
      cmds = [];
    } else {
      cmds = {};
    }


    switch(level) {
      case "User":
        return this.priv_cmds("User", fullname);
      case "Deputy": {
        let user_cmds = this.priv_cmds("User", fullname);
        let dep_cmds = this.priv_cmds("Deputy", fullname);
        if(fullname) {
          return user_cmds.concat(dep_cmds).sort();
        } else {
          return this.collect_cmds(user_cmds, dep_cmds);
        }
        break;
      }
      case "Admin": {
        let user_cmds = this.priv_cmds("User", fullname);
        let dep_cmds = this.priv_cmds("Deputy", fullname);
        let admin_cmds = this.priv_cmds("Admin", fullname);
        if(fullname) {
          return user_cmds.concat(dep_cmds).concat(admin_cmds).sort();
        } else {
          return this.collect_cmds(user_cmds, dep_cmds, admin_cmds);
        }
        break;
      }

    }
  }
  collect_cmds() {
    let cmds = {};
    let len = arguments.length;
    for( let i = 0; i < arguments.length; i++) {
      for(let p in arguments[i]) {
        if(arguments[i].hasOwnProperty(p)) {
          cmds[p] = arguments[i][p];
        }
      }
    }

    return cmds;
  }

}

module.exports = new GOONTUBE_COMMANDS();
