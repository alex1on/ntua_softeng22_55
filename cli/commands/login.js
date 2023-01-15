const chalk = require("chalk");
const request = require("request");

function login({ username, passw }) {
  request.post(
    "http://localhost:9103/intelliq_api/login" +
    `${username}` +
    "/" +
    `${passw}`,
    { json: true },
    (err, res, body) => {
      if (err) {
        return console.error(err);
      }
      console.log(body);
    });
}
module.exports = login;
