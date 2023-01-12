const conf = new (require("conf"))();
const chalk = require("chalk");

function getsessionanswers({ questionnaire_id, session, format }) {
  if (format !== "json" && format !== "csv") {
    console.error(
      chalk.red("`--format` value has to be either `json` or `csv`.")
    );
  } else {
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
    if (format == "json") {
      // Print json object
    } else {
      // Print csv object
    }
  }
}
module.exports = getsessionanswers;
