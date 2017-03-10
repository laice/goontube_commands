const gtc = require('./goontube_commands.js');

//console.log(gtc);
// get the command kick

let kick = gtc['kick'];

// show kick description
console.log('Kick:', kick.desc);

// show kick privs:
console.log("Kick privs:", kick.privs);

// show kick parameters:
console.log("Kick params:", kick.params);
