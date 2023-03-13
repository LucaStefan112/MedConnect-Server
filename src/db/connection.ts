import mongoose from "mongoose";
const dotenv = require("dotenv");

export function dbConnect() {
  if (dotenv.error) {
    throw dotenv.error;
  }

  const { USERNAME, PASSWORD } = dotenv.config().parsed;

  const connectionString =
    "mongodb+srv://" +
    USERNAME +
    ":" +
    PASSWORD +
    "@db.i0bozci.mongodb.net/?retryWrites=true&w=majority";

  mongoose
    .connect(connectionString)
    .then(() => {
      console.log("Successfully connected to database");
    })
    .catch((err) => {
      console.log(err);
      console.log("Failed to connect to database!");
    });
}
