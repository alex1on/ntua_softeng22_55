const conf = new (require("conf"))();
const chalk = require("chalk");

function getquestionanswers({ questionnaire_id, question_id, format }) {
  if (format !== "json" && format !== "csv") {
    console.error(
      chalk.red("`--format` value has to be either `json` or `csv`.")
    );
  } else {
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
    if (format == "json") {
      // Print json object
    } else {
      // Print csv object
    }
  }
}
module.exports = getquestionanswers;
