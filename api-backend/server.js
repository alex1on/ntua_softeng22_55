const app = require('./app');

app.listen(process.env.SERVER_PORT || 3000, () => console.log(`App available on http://localhost:3000`));