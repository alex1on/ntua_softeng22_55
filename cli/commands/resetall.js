const authreq = require("../authreq")

function resetall() {
  authreq.post("https://localhost:9103/intelliq_api/admin/resetall", {
    // using strictSSL: false means that we ignore the self-signed certificate.
    // We only do this during development phase and should be removed if we obtain
    // a trusted SSL certificate.
    json: true,
    strictSSL: false,
    callback: (err, res, body) => {
      if (err) {
        return console.error(err);
      }
      console.log(JSON.stringify(body, null, 4));
    },
  });
}

module.exports = resetall;
