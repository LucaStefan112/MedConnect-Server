import { dbConnect } from "./db/connection";
import { limiter } from "./middlewares/limiter";
import cookieParser from "cookie-parser";

// routes
import appointmentRouter from "./routes/appointment";
import userRouter from "./routes/user";
import analysisRouter from "./routes/analysis";
import scheduleRouter from "./routes/schedule";
import { checkAuth } from "./controllers/check-auth.controller";

import express from "express";
import settingSchedule, { gettingSchedule } from "./methods/setSchedule";
import jsonHelper, { busyDays, freeDays, jsonOpener } from "./methods/jsonCreator";
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(limiter);

app.get('/check-auth/:token', checkAuth);

app.use("/appointments", appointmentRouter);
app.use("/users", userRouter);
app.use("/analyses", analysisRouter);
app.use("/schedule",scheduleRouter);

const start = async () => {
  try {
    await dbConnect();
    //await settingSchedule("641b2d89900aa25346adbd67",new Date(),"6414c830e7477147fafa87e4");
    //await jsonHelper("641b2d89900aa25346adbd67");
    //const result=await jsonOpener();
    //console.log(result);
    await freeDays();
    await busyDays();
    app.listen(process.env.PORT, () => {
      console.log(`Example app listening on port ${process.env.PORT}!`);
    });
  } catch (err) {
    throw err;
  }
};

start();

export default app;