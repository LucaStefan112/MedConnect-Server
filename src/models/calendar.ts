import mongoose from "mongoose";
import {IUserModel} from "../models/user"
export interface ICalendar{
    doctor: IUserModel;
    dates: [Date];
}
export interface ICalendarModel extends ICalendar, mongoose.Document { }
const calendarSchema= new mongoose.Schema({
    doctor:{
        type:mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    dates:{
        type: [Date],
        required:true,
    }
})

export default mongoose.model<ICalendarModel>("Calendar",calendarSchema);

//in calendar -> available dates =)