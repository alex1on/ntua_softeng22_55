const { ObjectId } = require("mongodb");
const express = require("express");
const { connectToDb, getDb } = require("./db");

// init app & middleware
const app = express();
app.use(express.json());

// db connection
let db;
connectToDb((err) => {
  if (!err) {
    app.listen(3000, () => {
      console.log("app listening on port 3000");
    });
    db = getDb();
  }
});

// routes
app.get("/users", (req, res) => {
  // current page
  const page = req.query.p || 0;
  const usersPerPage = 3;

  let users = [];

  db.collection("users")
    .find()
    .sort({ questionnaires: 1 })
    .skip(page * usersPerPage)
    .limit(usersPerPage)
    .forEach((book) => users.push(book))
    .then(() => {
      res.status(200).json(users);
    })
    .catch(() => {
      res.status(500).json({ error: "Could not fetch the documents" });
    });
});

app.get("/users/:id", (req, res) => {
  if (ObjectId.isValid(req.params.id)) {
    db.collection("users")
      .findOne({ _id: ObjectId(req.params.id) })
      .then((doc) => {
        res.status(200).json(doc);
      })
      .catch((err) => {
        res.status(500).json({ error: "Could not fetch the document" });
      });
  } else {
    res.status(500).json({ error: "Not a valid doc id" });
  }
});

app.post("/users", (req, res) => {
  const user = req.body;

  db.collection("users")
    .insertOne(user)
    .then((result) => {
      res.status(201).json(result);
    })
    .catch((err) => {
      res.status(500).json({ err: "Could not create a new document" });
    });
});

app.delete("/users/:id", (req, res) => {
  if (ObjectId.isValid(req.params.id)) {
    db.collection("users")
      .deleteOne({ _id: ObjectId(req.params.id) })
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((err) => {
        res.status(500).json({ error: "Could not delete the documet" });
      });
  } else {
    res.status(500).json({ error: "Not a valid doc id" });
  }
});

app.patch("/users/:id", (req, res) => {
  const updates = req.body;

  if (ObjectId.isValid(req.params.id)) {
    db.collection("users")
      .updateOne({ _id: ObjectId(req.params.id) }, { $set: updates })
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((err) => {
        res.status(500).json({ error: "Could not update the documet" });
      });
  } else {
    res.status(500).json({ error: "Not a valid doc id" });
  }
});
