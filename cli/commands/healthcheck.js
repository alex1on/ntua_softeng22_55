//const chalk = require("chalk");
const request = require("request");

function healthcheck() {
  request.get(
    "http://localhost:9103/intelliq_api/admin/healthcheck",
    { 
      json: true ,
      callback:(err, res, body) => {
        if (err) {
          return console.error(err);
        }
        console.log(body);
      }
    }
  )
}
module.exports = healthcheck;
