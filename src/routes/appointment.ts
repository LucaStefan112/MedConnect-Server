import express from "express";
import {
  getAppointments,
  addAppointment,
  deleteAppointment,
  getAppointment,
} from "../controllers/appointments.controller";

// middlewares
import { validateToken } from "../middlewares/tokenValidation";

const appointmentRouter = express.Router();

appointmentRouter.get("/", validateToken, getAppointments);
appointmentRouter.post("/", validateToken, addAppointment);
appointmentRouter.get("/:id", validateToken, getAppointment);
appointmentRouter.delete("/:id", validateToken, deleteAppointment);

export default appointmentRouter;
