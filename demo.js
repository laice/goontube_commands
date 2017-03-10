const gtc = require('./goontube_commands.js');

// get the command kick
let kick = gtc['kick'];


// cmd.c gives the full command text i.e. kick.c === "$kick"

// show kick description
console.log(`${kick.c}:`, kick.desc);

// show kick parameters:
console.log(`${kick.c} params:`, kick.params);

// show kick privs:
console.log(`${kick.c} privs:`, kick.privs);

// minimum priveledge required for kick
console.log(`${kick.c} Min Priv:`, kick.min_priv);

// whisper privs
console.log(`${gtc['ban'].c} privs:`, gtc['whisper'].privs);
// minimum priv for whisper
console.log(`${gtc['whisper'].c} Min Priv:`, gtc['whisper'].min_priv);

//ban privs
console.log(`${gtc['ban'].c} privs:`, gtc['ban'].privs);
// minimum priv for ban
console.log(`${gtc['ban'].c} Min Priv:`, gtc['ban'].min_priv);

// commands of a certain privledge level
let usr_cmds = gtc.priv_cmds("User");
console.log("User level commands: ", Object.keys(usr_cmds));
console.log("Deputy level commands: ", Object.keys(gtc.priv_cmds("Deputy")));
console.log("Admin level commands: ", Object.keys(gtc.priv_cmds("Admin")));
