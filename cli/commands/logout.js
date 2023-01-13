const conf = new (require("conf"))();
const chalk = require("chalk");

function logout() {
  //  call API request for logout
  console.log(chalk.greenBright("You successfully logged out!"));
}
module.exports = logout;
