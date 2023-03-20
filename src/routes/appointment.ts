import express from "express";
import {
  getAppointments,
  addAppointment,
  deleteAppointment,
  getAppointment,
} from "../controllers/appointments.controller";

const appointmentRouter = express.Router();

appointmentRouter.get("/", getAppointments);
appointmentRouter.post("/", addAppointment);
appointmentRouter.get("/:id", getAppointment);
appointmentRouter.delete("/:id", deleteAppointment);

export default appointmentRouter;
