import mongoose from "mongoose";

import { AppointmentTypes } from "../helper/enums";
import { IUser, IUserModel } from "./user";
import { ISpecialisation } from "./specialisation";

export interface IAppointment {
  patient: IUserModel;
  doctor: string;
  date: Date;
  type: string;
  meetingLink: string;
  isActive: boolean;
  message: string;
  specialization: ISpecialisation;
}

export interface IAppointmentModel extends IAppointment, mongoose.Document {}

const appointmentSchema = new mongoose.Schema({
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  doctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  type: {
    type: String,
    required: true,
    enum: AppointmentTypes,
    default: "online",
  },
  meetingLink: {
    type: String,
    required: false,
  },
  isActive: {
    type: Boolean,
    required: true,
    default: true,
  },
  specialisation: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: false,
  },
});

export default mongoose.model<IAppointmentModel>(
  "Appointment",
  appointmentSchema
);
