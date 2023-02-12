const chalk = require("chalk");
const request = require("request");

function getsessionanswers({ questionnaire_id, session, format }) {
  if (format !== "json" && format !== "csv") {
    console.error(
      chalk.red("error: '--format' value has to be either 'json' or 'csv'")
    );
  } else {

    if (format == "json") {
      request.get(
        `http://localhost:9103/intelliq_api/getsessionanswers/${questionnaire_id}/${session}`,
        { 
          json: true ,
          callback:(err, res, body) => {
            if (err) {
              return console.error(err);
            }
            printMsg(questionnaire_id, session, format);
            console.log(body);
          }
        }
      )
    } else {
      request.get(
        `http://localhost:9103/intelliq_api/getsessionanswers/${questionnaire_id}/${session}`,
        {
          callback:(err, res, body) => {
            if (err) {
              return console.error(err);
            }
            // Print csv object
            printMsg(questionnaire_id, session, format);
            console.log("csv format not ready yet...");
          }
        }
      );
    }
  }
}
module.exports = getsessionanswers;

function printMsg(questionnaire_id, session, format) {
  console.log(
    chalk.greenBright(
      "The answers of session with id =",
      `'${session}'`,
      "for questionnaire with id =",
      `'${questionnaire_id}'`,
      "in",
      `${format}`,
      "format are:"
    )
  );
}