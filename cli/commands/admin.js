const chalk = require("chalk");
const authreq = require("../authreq")

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
    authreq.post(
      `https://localhost:9103/intelliq_api/admin/usermod/${username}/${passw}`,
      {
        json: true,
        strictSSL: false,
        callback: (err, res, body) => {
          if (err) {
            return console.error(err);
          }
          console.log(JSON.stringify(body, null, 4));
        },
      }
    );
  } else {
    request.get(`https://localhost:9103/intelliq_api/admin/users/${users}`, {
      json: true,
      strictSSL: false,
      callback: (err, res, body) => {
        if (err) {
          return console.error(err);
        }
        console.log(JSON.stringify(body, null, 4));
      },
    });
  }
}
module.exports = admin;
