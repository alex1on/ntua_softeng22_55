const chalk = require("chalk");
const request = require("request");

function logout() {
  //  call API request for logout
  request.post(
    "https://localhost:9103/intelliq_api/logout",
    // using strictSSL: false means that we ignore the self-signed certificate.
    // We only do this during development phase and should be removed if we obtain
    // a trusted SSL certificate.
    {
      json: true, strictSSL: false,
      callback: (err, res, body) => {
        if (err) {
          return console.error(err);
        }
        console.log(body);
      },
    }
  );
  console.log(chalk.greenBright("You successfully logged out!"));
}
module.exports = logout;
