const request = require("request")
const fs = require('fs');
const os = require('os');
const path = require('path');

let token
try{
    token = fs.readFileSync(
        path.join(os.tmpdir(), 'my-app','JWTToken')
    ).toString()
}catch{}
const authreq = request.defaults({ headers: {Authorization: `Bearer ${token}`}})
 
module.exports =  authreq 