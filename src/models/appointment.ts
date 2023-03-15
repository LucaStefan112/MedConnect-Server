import mongoose from "mongoose";

export interface IAppointment {
    patient: string;
    doctor: string;
    date: Date;
    time: string;
    type: string;
    link: string;
}

export interface IAppointmentModel extends IAppointment, mongoose.Document { }

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
    time: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
        enum: ["online", "face2face"],
        default: "online",
    },
    link: {
        type: String,
    },
});

export default mongoose.model<IAppointmentModel>("Appointment", appointmentSchema);