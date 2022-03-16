const express = require("express");
const mongoose = require("mongoose");

const app = express();

const PORT = 8000;
const DB_URL =
  "mongodb+srv://twg:twg123@cluster0.ong7q.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

mongoose
  .connect(DB_URL)
  .then(() => {
    console.log(`DB connected`);
  })
  .catch((err) => console.log(`DB connection error`, err));

app.listen(PORT, () => {
  console.log(`App is running on ${PORT}`);
});
