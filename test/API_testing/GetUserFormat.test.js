const request = require('supertest');
const app = require('../../api-backend/app');

describe('GetUser Format in case user exists in db', function() {
    
    /*
    Expected JSON Object Format in case user with ${username} exists
    {
       "status": "OK",
        "user": [
            {
                "UserID": User ID (string),
                "Username": Username (string),
                "psw": password (string),
                "last_update": (string)
            }
        ]
    }
    */
    it('It should return a JSON object with user\'s data and status message formatted as above!', function(done) {
        request(app)
        .get('/intelliq_api/admin/users/Manos')
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function(err, res) {
            if (err) return done(err);
            const data = JSON.parse(res.text);
            // Check for unexpected fields in the returned json object
            var extraFields = Object.keys(data).filter(key => key !== 'status' && key !== 'user');
            if (extraFields.length > 0) {
                return done(new Error(`Unexpected fields: ${extraFields.join(', ')}`));
            }
            // Check if status message is "OK"
            if (typeof data.status !== 'string' && data.status !== 'OK') {
                return done(new Error(`Status message should be \'OK\' but i got ${data.status}`));
            }
            // Check for unexpected fields in user json object
            extraFields = Object.keys(data.user[0]).filter(key => key !== 'UserID' && key !== 'Username' && key !== 'psw' && key !== 'last_update');
            if (extraFields.length > 0) {
                return done(new Error(`Unexpected fields in user object: ${extraFields.join(', ')}`));
            }
            const user = data.user[0];
            // UserID must be a number
            if (typeof user.UserID !== 'number') {
                return done(new Error(`UserID should be number, not ${typeof user.UserID}`));
            }
            // Username must be a string
            if (typeof user.Username !== 'string') {
                return done(new Error(`Username should be a string, not ${typeof user.Username}`));
            }
            // password must be a string
            if (typeof user.psw !== 'string') {
                return done(new Error(`psw should be a string, not ${typeof user.psw}`));
            }
            // last update must be a string
            if (typeof user.last_update !== 'string') {
                return done(new Error(`last_update should be a string, not ${typeof user.last_update}`));
            }
            done();
        });
    });
});

describe('GetUser Format in case user doesn\'t exist in db', function() {
    
    /*
    Expected JSON Object Format in case user with ${username} doesn't exist
    {
        "status": "failed",
        "message": "Username doesn't exist"
    }
    */
    it('It should return a JSON object with status message formatted as above!', function(done) {
        request(app)
        .get('/intelliq_api/admin/users/Manos1')
        .expect('Content-Type', /json/)
        .expect(402)
        .end(function(err, res) {
            if (err) return done(err);
            const response = JSON.parse(res.text);
            if (response.status === 'failed' && response.message === 'Username doesn\'t exist') {
                done();
            } else {
                done(new Error('Response does not match expected result.'));
            }
        });
    });
});
