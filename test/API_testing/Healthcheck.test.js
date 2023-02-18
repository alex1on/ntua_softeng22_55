const request = require('supertest');
const app = require('../../api-backend/app');

describe('Healthcheck Format', function() {

    /*
     Expected json format
    {
        "status": "OK" or "failed",
        "dbconnection": [connection string]
    }
    */
    it('It should return a JSON object with the status and dbconnection data formatted as above!', function(done) {
        request(app)
        .get('/intelliq_api/admin/healthcheck')
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function(err, res) {
            if (err) return done(err);
            const data = JSON.parse(res.text);
            // Check for unexpected fields in the returned json object
            const extraFields = Object.keys(data).filter(key => key !== 'status' && key !== 'dbconnection');
            if (extraFields.length > 0) {
                return done(new Error(`Unexpected fields: ${extraFields.join(', ')}`));
            }
            // Check if status message is "OK"
            if (typeof data.status !== 'string' && data.status !== 'OK' && data.status !== 'failed') {
                return done(new Error(`Status message should be \'OK\' but i got ${data.status}`));
            }
            done();
        });
    });
});
   