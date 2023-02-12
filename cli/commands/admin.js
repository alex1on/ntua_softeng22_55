const chalk = require("chalk");
const request = require("request");

function admin({ usermod, users, username, passw }) {
  if (
    (usermod == undefined && users == undefined) ||
    (usermod !== undefined && users !== undefined)
  ) {
    return console.error(
      chalk.red(
        "error: choose one and only one of the options '--usermod' and '--users <username>'"
      )
    );
  }

  if (usermod !== undefined && (username == undefined || passw == undefined)) {
    return console.error(
      chalk.red(
        "error: if '--usermod' option is chosen then options '--username <username>' and '--passw <password>' are required"
      )
    );
  }

  if (usermod !== undefined) {
    request.post(
      `http://localhost:9103/intelliq_api/admin/usermod/${username}/${passw}`,
      { 
        json: true ,
        callback:(err, res, body) => {
          if (err) {
            return console.error(err);
          }
          console.log(body)
        }
      }
    )
  } 
  else {
    request.get(
      `http://localhost:9103/intelliq_api/admin/users/${users}`,
      { 
        json: true ,
        callback:(err, res, body) => {
        if (err) {
            return console.error(err);
          }
          console.log(body);
        }
      }
    )
  }
}
module.exports = admin;
