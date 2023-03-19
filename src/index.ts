import { dbConnect } from "./db/connection";
import { limiter } from "./middlewares/limiter";
import appointmentRouter from "./routes/appointment";
import { validateToken } from "./middlewares/validation";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";

const express = require("express");
const app = express();

// routes
import userRouter from "./routes/user";

// routes
import userRouter from "./routes/user";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(limiter);

app.use(validateToken);

app.get("/check-auth/:token", (req, res) => {
  const { token } = req.params;
  if (token == null) {
    res
      .status(401)
      .send({ succes: false, message: "Unauthorized: Token is null" });
    return;
  }
  let currentUser;

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, tokenUser) => {
    if (err) {
      console.log(err);
      res
        .status(401)
        .send({ succes: false, message: `Unauthorized: Bad token \n ${err}` });
      return;
    }
    currentUser = tokenUser;
  });
  const newToken = jwt.sign(currentUser, process.env.ACCESS_TOKEN_SECRET, {
    // expiresIn: 60 * 60 * 60, //one hour
  });
  res.cookie("token", newToken, { httpOnly: true });
  res.status(200).send({ succes: true, message: currentUser });
});

app.use("/appointments", appointmentRouter);
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
