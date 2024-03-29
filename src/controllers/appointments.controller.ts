import { Request, Response } from "express";
import User from "../models/user";
import Appointment from "../models/appointment";
import { UserRoles } from "../helper/enums";

export const getAppointments = async (req: Request, res: Response) => {
  const { userId } = res.locals;

  const user = await User.findById(userId);

  if (!user) {
    return res.status(404).send({ success: false, message: 'User not found' });
  }

  let appointments = await Appointment.find({ patient: user }).populate(UserRoles.Doctor);

  return res.status(200).send({ success: true, message: 'appointments-found', appointments });
};

export const addAppointment = async (req: Request, res: Response) => {
  const { userId } = res.locals;
  const user = await User.findById(userId);

  if (!user) {
    return res.status(404).send({ success: false, message: 'User not found' });
  }

  const { doctor, specialisation } = req.body;
  const date = new Date(Date.parse(req.body.date));
  
  if (!doctor || !date || !specialisation) {
    return res.status(400).send({ success: false, message: 'No doctor or date' });
  }

  try {
    const newAppointent = new Appointment({
      patient: user,
      doctor,
      date,
      specialisation,
      isActive: true,
    });

    await newAppointent.save();

    return res.status(200).send({ success: true, message: 'appointment-added' });
  } catch (err) {
    return res.status(400).send({ success: false, message: 'Failed to add appointment' });
  }
};

export const getAppointment = async (req: Request, res: Response) => {
  const { userId } = res.locals;
  const { id } = req.params;

  if (!id) {
    return res.status(400).send({ success: false, message: 'Bad request' });
  }

  const appointment = await Appointment.findById(id).populate(UserRoles.Doctor).populate('doctor');

  if (!appointment) {
    return res.status(404).send({ success: false, message: 'Appointment not found' });
  }

  if (appointment.patient._id.valueOf() !== userId) {
    return res.status(401).send({ success: false, message: 'Unauthorized' });
  }

  return res.status(200).send({ success: true, message: 'appointment-found', appointment });
};

export const deleteAppointment = async (req: Request, res: Response) => {
  const { userId } = res.locals;
  const { id } = req.params;

  if (!id) {
    return res.status(400).send({ success: false, message: 'Bad request' });
  }

  const appointment = await Appointment.findById(id).populate(UserRoles.Patient);

  if (!appointment) {
    return res.status(404).send({ success: false, message: "Appointment not found" });
  }

  if (appointment.patient._id.valueOf() !== userId) {
    return res.status(401).send({ success: false, message: "Unauthorized" });
  }

  try {
    await Appointment.deleteOne({ _id: id });
  } catch (err) {
    return res.status(400).send({ success: false, message: "Failed to delete appointment" });
  }

  return res.status(200).send({ success: true, message: "Deleted appointment" });
};

export const setAppointmentMessage = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).send({ success: false, message: 'Bad request' });
  }

  const { message } = req.body;

  if (!message) {
    return res.status(400).send({ success: false, message: 'No message' });
  }

  const appointment = await Appointment.findById(id);

  if (!appointment) {
    return res.status(404).send({ success: false, message: 'Appointment not found' });
  }

  appointment.message = message;

  try {
    await appointment.save();
  } catch (err) {
    return res.status(400).send({ success: false, message: 'Failed to save message' });
  }

  return res.status(200).send({ success: true, message: 'Message saved' });
};
