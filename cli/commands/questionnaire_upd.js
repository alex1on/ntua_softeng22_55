const chalk = require("chalk");
const fs = require("fs");

function questionnaire_upd({ source }) {
  try {
    let rawdata = fs.readFileSync(source);
    let jsonObj = JSON.parse(rawdata);

    console.log(jsonObj)

    //   pass arguments to API request

    console.log(
      chalk.greenBright("\nYou successfully uploaded a new questionnaire!")
    );
  } catch (err) {
    console.error(err)
  }
}
module.exports = questionnaire_upd;
