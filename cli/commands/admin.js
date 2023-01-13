const conf = new (require("conf"))();
const chalk = require("chalk");

function admin({ usermod, users, username, passw }) {
    if (
      (usermod == undefined && users == undefined) ||
      (usermod !== undefined && users !== undefined)
    ) {
        console.error("Choose one and only one of the options '--usermod' and '--users <username>'.")
        return;
    } 
    
    if (usermod !== undefined && (username == undefined || passw == undefined)) {
        console.error("If '--usermod' option is chosen then options '--username <username>' and '--passw <password>' are required.")
        return;
    }
}
module.exports = admin;
