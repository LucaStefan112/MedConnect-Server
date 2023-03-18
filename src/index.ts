import mongoose from "mongoose";
import { dbConnect } from "./db/connection";
const express = require("express");
const app = express();

// routes
import userRouter from "./routes/user";


app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use("/users", userRouter);

const start = async () => {
  try {
    await dbConnect();

    app.listen(3000, () => {
      console.log("Example app listening on port 3000!");
    });
  } catch (err) {
    console.log(err);
  }
};

start();
