const chalk = require("chalk");
const request = require("request");
const csv = require("csv-parser");

function getsessionanswers({ questionnaire_id, session, format }) {
  if (format !== "json" && format !== "csv") {
    console.error(
      chalk.red("error: '--format' value has to be either 'json' or 'csv'")
    );
  } else {
    if (format == "json") {
      request.get(
        `https://localhost:9103/intelliq_api/getsessionanswers/${questionnaire_id}/${session}`,
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
    } else {
      request.get(
        `https://localhost:9103/intelliq_api/getsessionanswers/${questionnaire_id}/${session}?format=csv`,

        {
          strictSSL: false,
          callback: (err, res, body) => {

            if (err) {
              return console.error(err);
            }
            const results = [];
            const stream = csv({ headers: true })
              .on("data", (data) => results.push(data))
              .on("end", () => {
                for (const row of results) {
                  console.log(row);
                }
              });
            stream.write(body);
            stream.end();

          }
        }
      );
    }
  }
}
module.exports = getsessionanswers;