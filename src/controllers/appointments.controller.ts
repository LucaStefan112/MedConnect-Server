import { Request, Response } from "express";
import User from "../models/user";
import Appointment from "../models/appointment";

export const getAppointments = async (req: Request, res: Response) => {
  const { userId } = res.locals;
  const user = await User.findById(userId);

  const appointments = await Appointment.find({ 
    isActive: true,
    patient: user,
  }).populate("doctor");

  return res.status(200).send({ succes: true, message: 'appointments-found', appointments });
};

export const addAppointment = async (req: Request, res: Response) => {
  try {
    const { userId } = res.locals;
    const { doctor, type } = req.body;
    const date = new Date(req.body.date);

    const currentUser = await User.findById(userId);

    const newAppointent = new Appointment({
      patient: currentUser,
      doctor,
      date,
      type,
      isActive: true,
    });

    await newAppointent.save();

    return res.status(200).send({ succes: true, message: 'appointment-added' });
  } catch (err) {
    return res.status(400).send({ succes: false, message: 'Failed to add appointment' });
  }
};

export const getAppointment = async (req: Request, res: Response) => {  
  const { id } = req.params;
  const appointment = await Appointment.findById(id).populate('doctor').populate('patient');

  if (!appointment) {
    return res.status(404).send({ succes: false, message: 'Appointment not found' });
  }

  if(appointment.patient._id !== res.locals.userId) {
    return res.status(401).send({ succes: false, message: 'Unauthorized' });
  }

  return res.status(200).send({ succes: true, message: 'appointment-found', appointment });
};

export const deleteAppointment = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { userId } = res.locals;
  const appointment = await Appointment.find({ isActive: true }).findById(id).populate("patient");

  if (!appointment) {
    return res.status(404).send({ succes: false, message: "Appointment not found" });
  }

  if (appointment.patient._id !== userId) {
    return res.status(401).send({ succes: false, message: "Unauthorized" });
  }

  try{
    await Appointment.deleteOne({ _id: id });
  } catch (err) {
    return res.status(400).send({ succes: false, message: "Failed to delete appointment" });
  }

  return res.status(200).send({ succes: true, message: "Deleted appointment" });
};
