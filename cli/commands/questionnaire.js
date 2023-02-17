const chalk = require("chalk");
const request = require("request");
const csv = require("csv-parser");

function questionnaire({ questionnaire_id, format }) {
  if (format !== "json" && format !== "csv") {
    console.error(
      chalk.red("error: '--format' value has to be either 'json' or 'csv'")
    );
  } else {
    if (format == "json") {
      request.get(
        `https://localhost:9103/intelliq_api/questionnaire/${questionnaire_id}`,
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
    } else {
      request.get(
        `https://localhost:9103/intelliq_api/questionnaire/${questionnaire_id}?format=csv`,
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
          },
        }
      );
    }
  }
}
module.exports = questionnaire;
