const chalk = require("chalk");
const prompt = require("prompt-sync")();
const request = require("request");

function resetall() {
  var reset = prompt(
    chalk.yellowBright("Are you sure you want to reset everything? (y/n) ")
  );
  while (reset !== "y" && reset !== "n") {
    reset = prompt(chalk.yellowBright("Answer 'y' or 'n' "));
  }
  if (reset == "y") {
    // reset call from rest API
    request.post("http://localhost:9103/intelliq_api/admin/resetall");
    console.log(chalk.greenBright("You successfully reset all the data."));
  }
}
module.exports = resetall;
