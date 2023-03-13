const express = require("express");
import mongoose from "mongoose";

const username = "M2";
const password = "Bvq0cLqzUadzKcBF";
const connectionString =
  "mongodb+srv://" +
  username +
  ":" +
  password +
  "@db.i0bozci.mongodb.net/?retryWrites=true&w=majority";

mongoose
  .connect(connectionString)
  .then(() => {
    console.log("Baza e sus, la dispozitia dvs.");
  })
  .catch((err) => {
    console.log(err);
    console.log("Baza e jos, verifica cablajele!");
  });

const app = express();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/users", (req, res) => {
  res.send("Hello Users!");
});

app.listen(3000, () => {
  console.log("Example app listening on port 3000!");
});
