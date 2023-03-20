import { dbConnect } from "./db/connection";
import { limiter } from "./middlewares/limiter";
import cookieParser from "cookie-parser";
import { validateToken } from "./middlewares/validation";
// routes
import appointmentRouter from "./routes/appointment";
import userRouter from "./routes/user";
import { checkAuth } from "./controllers/check-auth.controller";

const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(limiter);

app.get('/check-auth', checkAuth);

app.use(validateToken);

app.use("/appointments", appointmentRouter);
app.use("/users", userRouter);

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
