const jwt = require('jsonwebtoken')

function auth(req,res,next){
    // auth verifies the login jwt token. In case of success, continues with next.
    // Otherwise, returns status 403 with Unauthorised
    try{
        const auth = req.headers.authorization
        const token=auth.split(' ')[1]
        //jwt.verify(token, process.env.JWT_KEY || '42')
        const decoded = jwt.verify(token, process.env.JWT_KEY || '42')
        req.user=decoded
        next() 
    }
    catch{
        res.status(403).send('Unauthorised')
    }
}

module.exports = auth