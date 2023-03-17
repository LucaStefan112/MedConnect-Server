const express = require("express");
const appointmentRouter = express.Router();

import { validateToken } from "../middlewares/validation";

import {
  getAppointments,
  postAppointment,
  deleteAppointment,
  deActivateAppointment,
  getAppointment,
} from "../controllers/appointments.controller";

appointmentRouter.use("/:token", validateToken);

appointmentRouter.get("/:token", getAppointments);

appointmentRouter.post("/:token", postAppointment);

appointmentRouter.get("/:token/:appId", getAppointment);

appointmentRouter.delete("/:token/:appId", deleteAppointment);

appointmentRouter.put("/:token/:appId", deActivateAppointment);

export default appointmentRouter;
