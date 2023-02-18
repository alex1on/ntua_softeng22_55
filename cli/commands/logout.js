const chalk = require("chalk");
//const request = require("request");
const fs = require('fs');
const os = require('os');
const path = require('path');

function logout() {
  //  call API request for logout
  /*request.post(
    "https://localhost:9103/intelliq_api/logout",
    {
      json: true, strictSSL: false,
      callback: (err, res, body) => {
        if (err) {
          return console.error(err);
        }
        console.log(body);
      },
    }
  );*/
  try {
    fs.rmSync( path.join(os.tmpdir(), 'my-app','JWTToken') )
  } catch {}
  console.log(chalk.greenBright("You successfully logged out!"))
  
}
module.exports = logout