const chalk = require("chalk");

function admin({ usermod, users, username, passw }) {
    if (
      (usermod == undefined && users == undefined) ||
      (usermod !== undefined && users !== undefined)
    ) {
        console.error("error: choose one and only one of the options '--usermod' and '--users <username>'")
        return;
    } 
    
    if (usermod !== undefined && (username == undefined || passw == undefined)) {
        console.error("error: if '--usermod' option is chosen then options '--username <username>' and '--passw <password>' are required")
        return;
    }
}
module.exports = admin;
