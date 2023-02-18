//const chalk = require("chalk");
const request = require("request");
const prompt = require("prompt-sync")({ sigint: true });
const fs = require('fs');
const os = require('os');
const path = require('path');

function login() {
  const Username = prompt("Write your Username: ")
  const Password = prompt("Write your Password: ")
  request.post(
    `https://localhost:9103/intelliq_api/login/${Username}/${Password}`,
    {      
      // using strictSSL: false means that we ignore the self-signed certificate.
      // We only do this during development phase and should be removed if we obtain
      // a trusted SSL certificate.
      json: true, 
      strictSSL: false,
      callback: (err, res, body) => {
        if (err) {
          return console.error(err);
        }
        if(body==='Invalid Credentials'){
          console.log(body)
        }
        else{
          SaveToken(body.token)
          console.log(token)
        }
      },
    }
  );
}

function SaveToken(token){
  let tmpDir;
  const appPrefix = 'my-app';
  try {
    tmpDir = fs.mkdirSync(path.join(os.tmpdir(), appPrefix))
    console.log(tmpDir)
    fs.writeFileSync(path.join(tmpDir,'JWTToken'), token)
  }
  catch (error) {
    if(error.errno === -4075 ){
      fs.writeFileSync(path.join(os.tmpdir(), appPrefix, 'JWTToken'), token)
    }else{
      console.log('Login Failed')
    }
  }
}



module.exports = login;




