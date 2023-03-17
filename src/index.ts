import { dbConnect } from "./db/connection";
const express = require("express");
const app = express();
const appointmentRoutes = require("./routes/appointment");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/appointments", appointmentRoutes);

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
