import { Router } from 'express';
import Specialisation from '../models/specialisation';
import User from '../models/user';
import { UserRoles } from '../helper/enums';
import Appointment from '../models/appointment';

const doctorRouter = Router();

doctorRouter.get('/specialisation/:_id', async (req, res) => {
  try{
    const { _id } = req.params;

    const specialisation = await Specialisation.findById(_id);

    if (!specialisation) {
      return res.status(404).send({ success: false, message: "Specialisation not found" });
    }

    const doctors = await User.find({ role: UserRoles.Doctor, specialisation: specialisation._id });

    if(doctors.length === 0) {
      return res.status(404).send({ success: false, message: "No doctors found" });
    }

    return res.status(200).send({ success: true, message: "Doctors found", doctors });
  } catch (err) {
    return res.status(500).send({ success: false, message: err.message });
  }
});

doctorRouter.get('/:_id/busy-intervals', async (req, res) => {
  try {
    const { _id } = req.params;

    const appointments = await Appointment.find({ doctor: _id });

    if(appointments.length === 0) {
      res.status(404).send({ success: false, message: "No appointments found" });
      return res.end();
    }

    const busyIntervals = appointments.map(appointment => appointment.date);

    res.status(200).send({ success: true, message: "Available days found", busyIntervals: [
      "2023-05-19T09:00:00+03:00",
      "2023-05-19T09:30:00+03:00",
      "2023-05-19T10:00:00+03:00",
      "2023-05-19T10:30:00+03:00",
      "2023-05-19T11:00:00+03:00",
      "2023-05-19T11:30:00+03:00",
      "2023-05-19T12:00:00+03:00",
      "2023-05-19T12:30:00+03:00",
      "2023-05-19T13:00:00+03:00",
      "2023-05-19T13:30:00+03:00",
      "2023-05-19T14:00:00+03:00",
      "2023-05-19T14:30:00+03:00",
      "2023-05-19T15:00:00+03:00",
    ] });    
  } catch (err) {
    res.status(500).send({ success: false, message: err.message });
  }

  return res.end();
});

export default doctorRouter;