const { MongoClient, ObjectId } = require("mongodb");

let dbConnection;
let uri =
  "mongodb+srv://pGiad:Af45d!k2@cluster0.yehjaed.mongodb.net/?retryWrites=true&w=majority";

module.exports = {
  connectToDb: (cb) => {
    MongoClient.connect(uri)
      .then((client) => {
        dbConnection = client.db("intelliQ");
        return cb();
      })
      .catch((err) => {
        console.log(err);
        return cb(err);
      });
  },
  getDb: () => dbConnection,
};
