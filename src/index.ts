import { dbConnect } from "./db/connection";
import { limiter } from "./middlewares/limiter";
import cookieParser from "cookie-parser";

// routes
import appointmentRouter from "./routes/appointment";
import userRouter from "./routes/user";
import analysisRouter from "./routes/analysis";
import { checkAuth } from "./controllers/check-auth.controller";

const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(limiter);

app.get('/check-auth/:token', checkAuth);

app.use("/appointments", appointmentRouter);
app.use("/users", userRouter);
app.use("/analyses", analysisRouter);

const start = async () => {
  try {
    await dbConnect();
    app.listen(process.env.PORT, () => {
      console.log(`Example app listening on port ${process.env.PORT}!`);
    });
  } catch (err) {
    throw err;
  }
};

start();
