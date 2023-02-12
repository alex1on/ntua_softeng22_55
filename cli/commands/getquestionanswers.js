const chalk = require("chalk");
const request = require("request");

function getquestionanswers({ questionnaire_id, question_id, format }) {
  if (format !== "json" && format !== "csv") {
    console.error(
      chalk.red("error: '--format' value has to be either 'json' or 'csv'")
    );
  } else {
    if (format == "json") {
      request.get(
        `http://localhost:9103/intelliq_api/getquestionanswers/${questionnaire_id}/${question_id}`,
        { 
          json: true ,
          callback:(err, res, body) => {
            if (err) {
              return console.error(err);
            }
            printMsg(questionnaire_id, question_id, format);
            console.log(body);
          }
        }
      )
    } else {
      request.get(
        `http://localhost:9103/intelliq_api/getquestionanswers/${questionnaire_id}/${question_id}`,
        {
          callback:(err, res, body) => {
            if (err) {
              return console.error(err);
            }
            // Print csv object
            printMsg(questionnaire_id, question_id, format);
            console.log("csv format not ready yet...");
          }
        }
      )
    }
  }
}
module.exports = getquestionanswers;

function printMsg(questionnaire_id, question_id, format) {
  console.log(
    chalk.greenBright(
      "The answers of question with id =",
      `'${question_id}'`,
      "for questionnaire with id =",
      `'${questionnaire_id}'`,
      "in",
      `${format}`,
      "format are:"
    )
  );
}
