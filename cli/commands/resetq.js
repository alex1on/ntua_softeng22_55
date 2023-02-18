const chalk = require("chalk");
const prompt = require("prompt-sync")({ sigint: true });
const authreq = require("../authreq")

function resetq({ questionnaire_id }) {
  request.post(
    `https://localhost:9103/intelliq_api/admin/resetq/${questionnaire_id}`,
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
  while (reset !== "y" && reset !== "n") {
    reset = prompt(chalk.yellowBright("Answer 'y' or 'n' "));
  }
  if (reset == "y") {
    authreq.post(
      `https://localhost:9103/intelliq_api/admin/resetq/${questionnaire_id}`,
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
          console.log(body);
        },
      }
    );
  }
}
module.exports = resetq;
