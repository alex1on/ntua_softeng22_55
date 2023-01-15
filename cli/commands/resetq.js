const chalk = require("chalk");
const prompt = require("prompt-sync")();
const request = require("request");

function resetq({ questionnaire_id }) {
  var reset = prompt(
    chalk.yellowBright(
      "Are you sure you want to delete the given answers for questionnaire with id =",
      `'${questionnaire_id}'?`,
      "(y/n) "
    )
  );
  while (reset !== "y" && reset !== "n") {
    reset = prompt(chalk.yellowBright("Answer 'y' or 'n' "));
  }
  if (reset == "y") {
    request.post(
      "http://localhost:9103/intelliq_api/admin/resetq/" +
      `${questionnaire_id}`,
      { json: true },
      (err, res, body) => {
        if (err) {
          return console.error(err);
        }
        console.log(body);
      }
    );
  }
}
module.exports = resetq;
