import {
  getAppointments,
  addAppointment,
  deleteAppointment,
  deActivateAppointment,
  getAppointment,
} from "../controllers/appointments.controller";
//import { validateToken } from "../middlewares/validation";

const express = require("express");
const appointmentRouter = express.Router();

appointmentRouter.get("/", getAppointments);

appointmentRouter.post("/", addAppointment);

appointmentRouter.get("/:appId", getAppointment);

appointmentRouter.delete("/:appId", deleteAppointment);

appointmentRouter.patch("/:appId", deActivateAppointment);

appointmentRouter.put("/:appId", deActivateAppointment);

export default appointmentRouter;
