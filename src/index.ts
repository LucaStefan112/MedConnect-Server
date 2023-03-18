import { dbConnect } from "./db/connection";
const express = require("express");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

import { limiter } from "./middlewares/limiter";
import appointmentRouter from "./routes/appointment";

app.use(limiter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/appointments", appointmentRouter);

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
