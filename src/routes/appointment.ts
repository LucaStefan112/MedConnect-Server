import express from "express";
import {
  getAppointments,
  addAppointment,
  deleteAppointment,
  getAppointment,
} from "../controllers/appointments.controller";

// middlewares
import { validateToken } from "../middlewares/tokenValidation";
import { validateBody } from "../middlewares/bodyValidation";

// validation
import { appointmentSchema } from "../validations/appointment.validation";


const appointmentRouter = express.Router();

appointmentRouter.get("/", validateToken, getAppointments);
appointmentRouter.post("/", validateToken, addAppointment);
appointmentRouter.get("/:id", validateToken, getAppointment);
appointmentRouter.delete("/:id", validateToken, deleteAppointment);

export default appointmentRouter;
