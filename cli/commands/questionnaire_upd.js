const chalk = require("chalk");
const fs = require("fs");
const request = require("request");
const FormData = require("form-data");

function questionnaire_upd({ source }) {
  try {
    if (!fs.existsSync(`${source}`)) {
      console.error("File does not exist.");
      return;
    }

    var jsonData;

    var file = fs.readFile(`${source}`, (err, data) => {
      if (err) {
        console.error(err);
        return;
      }

      jsonData = JSON.parse(data);
      // In order to send the data via multipart/form-data of 
      // the http message we have to firstly stringify the 
      // transmitted data. Note: The transmitted data MUST 
      // be an object. 
      jsonString = JSON.stringify(jsonData);

      var form = {
        file: jsonString
      }

      request.post({
        url: "https://localhost:9103/intelliq_api/admin/questionnaire_upd",
        formData: form,
        strictSSL: false
      },

        (err, res, body) => {
          if (err) {
            return console.error(err);
          }
          console.log(body);
          console.log(
            chalk.greenBright("\nYou successfully uploaded a new questionnaire!")
          );
        }
      );

    });

  } catch (err) {
    console.error(err)
  }
}
module.exports = questionnaire_upd;