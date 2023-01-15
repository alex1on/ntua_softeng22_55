const chalk = require("chalk");
const prompt = require("prompt-sync")();

function resetq({ questionnaire_id }) {
  var reset = prompt(
    chalk.yellowBright(
      "Are you sure you want to delete the given answers for questionnaire with id =",
      `${questionnaire_id}?`,
      "(y/n) "
    )
  );
  while (reset !== "y" && reset !== "n") {
    reset = prompt(chalk.yellowBright("Answer 'y' or 'n' "));
  }
  if (reset == "y") {
    // reset call from rest API
    console.log(
      chalk.greenBright(
        "You successfully deleted the answers for questionnaire with id =",
        `${questionnaire_id}.`
      )
    );
  }
}
module.exports = resetq;
