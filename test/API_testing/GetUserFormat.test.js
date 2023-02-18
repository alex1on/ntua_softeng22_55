const request = require('supertest');
const app = require('../../api-backend/app');
const { pool } = require('../../api-backend/db-init');

describe('GET /intelliq_api/admin/users/:username', function() {
    
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
        
        const username = 'Manos';

        // Execute SQL query to figure out if there are data or not
        const query = `SELECT * FROM Q_User WHERE Username = '${username}'`;
        pool.getConnection((err, conn) => {
            conn.promise().query(query)
                .then(([rows, fields]) => {

                    // No data 
                    if(rows.length == 0) {
                        pool.releaseConnection(conn);
                        request(app)
                            .get(`/intelliq_api/admin/users/${username}`)
                            .expect(204)
                            .end(function(err, res) {
                                if (err) {
                                    return done(err);
                                }
                                else {
                                    if (res.status !== 204) {
                                        done(new Error('Expected status 204 (No data) but got ' + res.status));
                                    }
                                    else {
                                        return done();
                                    }
                                }
                            })
                    }
                    else {
                        pool.releaseConnection(conn);
                        // Check for desired JSON object format
                        request(app)
                            .get(`/intelliq_api/admin/users/${username}`)
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
                                extraFields = Object.keys(data.user).filter(key => key !== 'UserID' && key !== 'Username' && key !== 'psw' && key !== 'last_update');
                                if (extraFields.length > 0) {
                                    return done(new Error(`Unexpected fields in user object: ${extraFields.join(', ')}`));
                                }
                                const user = data.user;
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
                                return done();
                            });
                    }
                })
                .catch((err) => {
                    pool.releaseConnection(conn);
                    return done(new Error(`Error in querying the database ${err.message}`));
                });
        }); 
    });
});