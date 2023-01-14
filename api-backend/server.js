const app = require('./app');

app.listen(process.env.SERVER_PORT || 9103, () => console.log(`App available on http://localhost:9103`));