const conf = new (require("conf"))();
const chalk = require("chalk");

function doanswer({ questionnaire_id, question_id, session, option_id }) {
  console.log(
    chalk.greenBright(
      "You successfully answered the question with id =",
      `'${question_id}'`,
      "of questionnaire with id =",
      `'${questionnaire_id}'`,
      "in session with id =",
      `'${session}'`,
      "with the option with id =",
      `'${option_id}'.`
    )
  );
}
module.exports = doanswer;
