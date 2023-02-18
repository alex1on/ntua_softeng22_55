//const chalk = require("chalk");
//const request = require("request");
const authreq = require("../authreq")

function healthcheck() {
  authreq.get("https://localhost:9103/intelliq_api/admin/healthcheck", {
    // using strictSSL: false means that we ignore the self-signed certificate.
    // We only do this during development phase and should be removed if we obtain
    // a trusted SSL certificate.
    json: true, strictSSL: false,
    callback: (err, res, body) => {
      if (err) {
        return console.error(err);
      }
      console.log(body);
    },
  });
}
module.exports = healthcheck;
