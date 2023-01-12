const conf = new (require("conf"))();
const chalk = require("chalk");

function question({ questionnaire_id, question_id, format }) {
  if (format !== "json" && format !== "csv") {
    console.error(
      chalk.red("`--format` value has to be either `json` or `csv`.")
    );
  } else {
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
    );
    if (format == "json") {
      // Print json object
    } else {
      // Print csv object
    }
  }
}
module.exports = question;
