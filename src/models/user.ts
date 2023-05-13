import mongoose from "mongoose";

import { UserRoles } from "../helper/enums";
import { ISpecialisation } from "./specialisation";

export interface IUser {
  firstName: string;
  lastName: string;
  cnp: string;
  email: string;
  password: string;
  role: string;
  dateOfBirth: Date;
  sex: string;
  citizenship: string;
  country: string;
  county: string;
  city: string;
  completeAddress: string;  
  phoneNumber: string;
  specialization?: ISpecialisation;
}

export interface IUserModel extends IUser, mongoose.Document { }

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: false,
  },
  lastName: {
    type: String,
    required: false,
  },
  cnp: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: false,
    unique: true,
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      'Please provide a valid email',
    ],
  },
  password: {
    type: String,
    required: false,
  },
  role: {
    type: String,
    required: false,
    enum: UserRoles,
    default: "patient",
  },
  dateOfBirth: {
    type: Date,
    required: false, // we can add this later
    trim: true,
  },
  phoneNumber: {
    type: String,
    required: false,
    trim: true,
  },
  specialisation: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Specialisation",
    required: false,
  },
  sex: {
    type: String,
    required: false,
  },
  citizenship: {
    type: String,
    required: false,
  },
  country: {
    type: String,
    required: false,
  },
  county: {
    type: String,
    required: false,
  },
  city: {
    type: String,
    required: false,
  },
  completeAddress: {
    type: String,
    required: false,
  }
});

export default mongoose.model<IUserModel>("User", userSchema);
