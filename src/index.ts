import { dbConnect } from "./db/connection";
import { limiter } from "./middlewares/limiter";
import cookieParser from "cookie-parser";

// routes
import appointmentRouter from "./routes/appointment";
import userRouter from "./routes/user";
import analysisRouter from "./routes/analysis";
import { checkAuth } from "./controllers/check-auth.controller";
import corsMiddleware from "./middlewares/cors";

import Specialisation from "./models/specialisation";

import express from "express";
import doctorRouter from "./routes/doctorRouter";
const app = express();

app.use(corsMiddleware);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(limiter);

app.get('/check-auth/:token', checkAuth);

app.use("/appointments", appointmentRouter);
app.use("/users", userRouter);
app.use("/analyses", analysisRouter);
app.use("/doctors", doctorRouter)

app.get('/specialisations', async (req, res) => {
  const specialisations = await Specialisation.find();

  res.status(200).send({ success: true, specialisations }); 
  return res.end();
});

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
