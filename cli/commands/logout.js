const chalk = require("chalk");
const authreq = require("../authreq")
const fs = require('fs');
const os = require('os');
const path = require('path');

function logout() {
  //  call API request for logout
  authreq.post(
    "https://localhost:9103/intelliq_api/logout",
    {
      json: true, strictSSL: false,
      callback: (err, res, body) => {
        if (err) {
          return console.error(err);
        }
          console.log(JSON.stringify(body, null, 4));
      },
    }
  )

  try {
    fs.rmSync( path.join(os.tmpdir(), 'my-app','JWTToken') )
  } catch {}
  
  
}
module.exports = logout