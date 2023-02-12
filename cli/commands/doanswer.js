//const chalk = require("chalk");
const request = require("request");

function doanswer({ questionnaire_id, question_id, session, option_id }) {
  request.post(
    `http://localhost:9103/intelliq_api/doanswer/${questionnaire_id}/${question_id}/${session}/${option_id}`,
    { 
      json: true ,
      callback:(err, res, body) => {
        if (err) {
          return console.error(err);
        }
        console.log(body);
      }
    }
  );
}
module.exports = doanswer;
