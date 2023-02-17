//const chalk = require("chalk");
const request = require("request");

function login({ username, passw }) {
  request.post(
    `https://localhost:9103/intelliq_api/login/${username}/${passw}`,
    {
      // using strictSSL: false means that we ignore the self-signed certificate.
      // We only do this during development phase and should be removed if we obtain
      // a trusted SSL certificate.
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
}
module.exports = login;
