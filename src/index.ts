const express = require("express");
import mongoose from "mongoose";

const connectionString =
  "mongodb+srv://M2:Bvq0cLqzUadzKcBF@db.i0bozci.mongodb.net/?retryWrites=true&w=majority";

mongoose
  .connect(connectionString)
  .then(() => {
    console.log("Baza e sus, la dispozitia dvs.");
  })
  .catch((err) => {
    console.log(err);
    console.log("Baza e jos, verifica cablajele!");
  });

const Schema = mongoose.Schema;

const testSchema = new mongoose.Schema({
  name: {
    type: String,
    default: "-",
  },
  added: Date,
});

const Test = mongoose.model("Test", testSchema);

const app = express();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/test-db/add", async (req, res) => {
  const test = new Test({
    name: "Test",
    added: Date.now(),
  });
  await test.save();
  res.send(test);
});

app.get("/test-db/show", async (req, res) => {
  const tests = await Test.find();
  res.send(tests);
});

app.get("/test-db-clear", async (req, res) => {
  await Test.deleteMany();
  const tests = await Test.find();
  res.send(tests);
});

app.get("/users", (req, res) => {
  res.send("Hello Users!");
});

app.listen(3000, () => {
  console.log("Example app listening on port 3000!");
});
