const conf = new (require("conf"))();
const chalk = require("chalk");

function login({ username, passw }) {
    //  pass arguments to API request
  console.log(
    chalk.greenBright(
      "You successfully logged in",
      `${username}!`
    )
  );
}
module.exports = login;
