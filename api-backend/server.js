const app = require('./app');
const https = require('https');
const fs = require('fs');

const options = {
    key: fs.readFileSync('./server.key'),
    cert: fs.readFileSync('./server.cert')
};

const server = https.createServer(options, app);

server.listen(process.env.SERVER_PORT || 9103, () => console.log(`App available on https://localhost:9103`));