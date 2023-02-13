const chalk = require("chalk");
const request = require("request");

function question({ questionnaire_id, question_id, format }) {
  if (format !== "json" && format !== "csv") {
    console.error(
      chalk.red("error: '--format' value has to be either 'json' or 'csv'")
    )
  } else {

    if (format == "json") {
      request.get(
        `http://localhost:9103/intelliq_api/question/${questionnaire_id}/${question_id}`,
        { json: true ,
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
        `http://localhost:9103/intelliq_api/question/${questionnaire_id}/${question_id}`,
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
module.exports = question;

function printMsg(questionnaire_id, question_id, format) {
  console.log(
    chalk.greenBright(
      "The question with questionnaire_id =",
      `'${questionnaire_id}'`,
      "and question_id =",
      `'${question_id}'`,
      "in",
      `${format}`,
      "format is:"
    )
  )
}
