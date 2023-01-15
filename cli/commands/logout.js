const chalk = require("chalk");
const request = require("request");

function logout() {
  //  call API request for logout
  request.post(
    "http://localhost:9103/intelliq_api/logout",
    { json: true },
    (err, res, body) => {
      if (err) {
        return console.error(err);
      }
      console.log(body);
    }
  )
  console.log(chalk.greenBright("You successfully logged out!"));
}
module.exports = logout;
