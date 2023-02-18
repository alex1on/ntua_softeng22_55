const fs = require("fs");
const authreq = require("../authreq")
const path = require("path");

function questionnaire_upd({ source }) {
  try {
    if (!fs.existsSync(`${source}`)) {
      console.error("File does not exist.");
      return;
    }

    if (path.extname(source) !== ".json") {
      console.error("File is not a JSON file.");
      return;
    }

    var jsonData;

    fs.readFile(`${source}`, (err, data) => {
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

      authreq.post({
        url: "https://localhost:9103/intelliq_api/admin/questionnaire_upd",
        formData: form,
        strictSSL: false
      },

        (err, res, body) => {
          if (err) {
            return console.error(err);
          }
          console.log(body);
        }
      );

    });

  } catch (err) {
    console.log(JSON.stringify(body, null, 4));
  }
}
module.exports = questionnaire_upd;