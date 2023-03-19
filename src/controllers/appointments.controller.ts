import { Request, Response } from "express";
const express = require("express");

import User from "../models/user";
import Appointment from "../models/appointment";
// import Result from "../models/results";

export const getAppointments = async (req: Request, res: Response) => {
  const { id } = res.locals.user;

  const currentUser = await User.findById(id);
  if (currentUser === null) {
    res.status(404).send({
      succes: false,
      message: "The user was not found",
    });
    return;
  }

  const appointments = await Appointment.find({
    $or: [{ patient: id }, { doctor: id }],
  });

  console.log(appointments);
  res.status(200).send({
    succes: true,
    message: appointments,
  });
};

export const addAppointment = async (req: Request, res: Response) => {
  try {
    const { id } = res.locals.user;
    const { doctor, type } = req.body;
    const date = new Date(req.body.date);

    const currentUser = await User.findById(id);

    const newAppointent = new Appointment({
      patient: currentUser,
      doctor,
      date,
      type,
      isActive: true,
    });
    newAppointent.save();
    console.log(newAppointent);
    res.status(200).send({
      succes: true,
      message: newAppointent,
    });
  } catch (err) {
    console.log(err);
    res.status(400).send({
      succes: false,
      message: "Failed to add appointment",
    });
  }
};

export const getAppointment = async (req: Request, res: Response) => {
  const { id } = res.locals;
  const { appId } = req.params;
  const currentApp = await Appointment.findById(appId);
  if (currentApp == null) {
    res.status(404).send({
      succes: false,
      message: "The given appointment ID was not found",
    });
    return;
  }

  if (currentApp.patient != id && currentApp.doctor != id) {
    {
      console.log("Refused the getting of an appointment");
      console.log("Cause: unauthorized");
      res.status(401).send({
        succes: false,
        message: "Unauthorized",
      });
      return;
    }
  }
  res.status(200).send({ succes: true, message: currentApp });
};

export const deActivateAppointment = async (req: Request, res: Response) => {
  const { id } = res.locals;
  const { appId } = req.params;
  const currentApp = await Appointment.findById(appId);
  if (currentApp == null) {
    res.status(404).send({
      succes: false,
      message: "The given appointment ID was not found",
    });
  }

  if (currentApp.patient != id && currentApp.doctor != id) {
    {
      console.log("Refused the editing of an appointment");
      console.log("Cause: unauthorized");
      res.status(401).send({
        succes: false,
        message:
          "Refused the editing of an appointment\n" + "Cause: unauthorized",
      });
      return;
    }
  }
  currentApp.isActive = false;
  await currentApp.save();
  res.status(200).send({
    succes: true,
    message: "Deactivated appointment",
  });
};

export const deleteAppointment = async (req: Request, res: Response) => {
  const { id } = res.locals;
  const { appId } = req.params;
  const currentApp = await Appointment.findById(appId);
  if (currentApp == null) {
    res.status(404).send({
      succes: false,
      message: "The given appointment ID was not found",
    });
    return;
  }

  if (currentApp.patient != id && currentApp.doctor != id) {
    {
      console.log("Refused the deletion of an appointment");
      console.log("Cause: unauthorized");
      res.status(401).send({
        succes: false,
        message:
          "Refused the deletion of an appointment\n" + "Cause: unauthorized",
      });
      return;
    }
  }
  Appointment.findByIdAndRemove(appId);
  res.status(200).send({ succes: true, message: "Deleted appointment" });
};
