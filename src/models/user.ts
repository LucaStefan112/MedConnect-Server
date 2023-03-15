import mongoose from "mongoose";

export interface IUser {
    fullName: string;
    email: string;
    password: string;
    role: string;
    dateOfBirth: Date;
    phoneNumber: string;
}

export interface IUserModel extends IUser, mongoose.Document { }

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Please provide a valid email',
        ],
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
        enum: ["admin", "patient", "doctor", "nurse"],
        default: "patient",
    },
    dateOfBirth: {
        type: Date,
        required: false, // we can add this later
        trim: true,
    },
    phoneNumber: {
        type: String,
        required: true,
        trim: true,
    },
});

export default mongoose.model<IUserModel>("User", userSchema);