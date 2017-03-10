const gtc = require('./goontube_commands.js');

// get the command kick
let kick = gtc['kick'];

// show kick description
console.log('Kick:', kick.desc);

// show kick parameters:
console.log("Kick params:", kick.params);

// show kick privs:
console.log("Kick privs:", kick.privs);

// minimum priveledge required for kick
console.log("Kick Min Priv:", kick.min_priv());

// whisper privs
console.log("Whisper privs:", gtc['whisper'].privs);
// minimum priv for whisper
console.log("Whisper Min Priv:", gtc['whisper'].min_priv());

//ban privs
console.log("Ban privs:", gtc['ban'].privs);
// minimum priv for ban
console.log("Ban Min Priv:", gtc['ban'].min_priv());
