const express = require("express");
const router = express.Router();
import mongoose from "mongoose";
const User = require("../models/user");
const Appointment = require("../models/appointment");

// import { Express, Request, Response, NextFunction } from "express";
// import validateToken from "../middlewares/validation";

router.use("/:token", (req, res, next) => {
  const { token } = req.params;
  console.log(token);
  //   req.params.id = findIdFromToken(token);
  req.body.id = token;
  next();
});

router.get("/:token", async (req, res) => {
  const { id } = req.body;

  const currentUser = await User.findById(id);

  const appointments = await Appointment.find({
    $or: [{ patient: id }, { doctor: id }],
  });
  if (appointments == null) {
    res.status(404);
    res.send({
      succes: false,
      message: "The given appointment user was not found",
    });
  }

  console.log(appointments);
  res.status(200);
  res.send({ succes: true, message: appointments });
});

router.post("/:token", async (req, res) => {
  const { id } = req.body;
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
});

router.delete("/:token/:appId", async (req, res) => {
  const { id } = req.body;
  const { appId } = req.params;
  const currentApp = await Appointment.findById(appId);
  if (currentApp == null) {
    res.status(404);
    res.send({
      succes: false,
      message: "The given appointment ID was not found",
    });
  }
  console.log(`DOCTOR: [${currentApp.doctor}]`);
  console.log(id);
  console.log(`PATIENT: [${currentApp.patient}]`);

  if (!currentApp.patient.equals(id) && !currentApp.patient.equals(id)) {
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
});

module.exports = router;
