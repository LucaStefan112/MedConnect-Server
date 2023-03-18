import { Request, Response } from "express";
const express = require("express");

import User from "../models/user";
import Appointment from "../models/appointment";
// import Result from "../models/results";

export const getAppointments = async (req: Request, res: Response) => {
  const { id } = res.locals;

  const currentUser = await User.findById(id);
  if (currentUser == null) {
    res.status(404);
    res.send({
      succes: false,
      message: "The user was not found",
    });
  }

  const appointments = await Appointment.find({
    $or: [{ patient: id }, { doctor: id }],
  });

  console.log(appointments);
  res.status(200);
  res.send({ succes: true, message: appointments });
};

export const postAppointment = async (req: Request, res: Response) => {
  const { id } = res.locals;
  const { doctor, type, isActive } = req.body;
  const date = new Date(req.body.date);

  const currentUser = await User.findById(id);

  const newAppointent = new Appointment({
    patient: currentUser,
    doctor,
    date,
    type,
    isActive,
  });
  newAppointent.save();
  console.log(newAppointent);
  res.send({ succes: true, message: newAppointent });
};

export const getAppointment = async (req: Request, res: Response) => {
  const { id } = res.locals;
  const { appId } = req.params;
  const currentApp = await Appointment.findById(appId);
  if (currentApp == null) {
    res.status(404);
    res.send({
      succes: false,
      message: "The given appointment ID was not found",
    });
  }

  if (!currentApp.patient == id && currentApp.patient == id) {
    {
      console.log("Refused the getting of an appointment");
      console.log("Cause: unauthorized");
      res.status(401);
      res.send({
        succes: false,
        message:
          "Refused the getting of an appointment\n" + "Cause: unauthorized",
      });
      return;
    }
  }
  res.status(200);
  res.send({ succes: true, message: currentApp });
};

export const deActivateAppointment = async (req: Request, res: Response) => {
  const { id } = res.locals;
  const { appId } = req.params;
  const currentApp = await Appointment.findById(appId);
  if (currentApp == null) {
    res.status(404);
    res.send({
      succes: false,
      message: "The given appointment ID was not found",
    });
  }

  if (!currentApp.patient == id && currentApp.patient == id) {
    {
      console.log("Refused the editing of an appointment");
      console.log("Cause: unauthorized");
      res.status(401);
      res.send({
        succes: false,
        message:
          "Refused the editing of an appointment\n" + "Cause: unauthorized",
      });
      return;
    }
  }
  currentApp.isActive = false;
  await currentApp.save();
  res.status(200);
  res.send({ succes: true, message: "Deactivated appointment" });
};

export const deleteAppointment = async (req: Request, res: Response) => {
  const { id } = res.locals;
  const { appId } = req.params;
  const currentApp = await Appointment.findById(appId);
  if (currentApp == null) {
    res.status(404);
    res.send({
      succes: false,
      message: "The given appointment ID was not found",
    });
  }
  //   console.log(`DOCTOR: [${currentApp.doctor}]`);
  //   console.log(id);
  //   console.log(`PATIENT: [${currentApp.patient}]`);

  if (!currentApp.patient == id && currentApp.patient == id) {
    {
      console.log("Refused the deletion of an appointment");
      console.log("Cause: unauthorized");
      res.status(401);
      res.send({
        succes: false,
        message:
          "Refused the deletion of an appointment\n" + "Cause: unauthorized",
      });
      return;
    }
  }
  Appointment.findByIdAndRemove(appId);
  res.status(200);
  res.send({ succes: true, message: "Deleted appointment" });
};
