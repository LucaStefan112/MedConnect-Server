import mongoose from "mongoose";
import {IUserModel} from "../models/user"
export interface ISchedule{
    doctor: IUserModel;
    dates: [Date];
}
export interface IScheduleModel extends ISchedule, mongoose.Document { }
const scheduleSchema= new mongoose.Schema({
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

export default mongoose.model<IScheduleModel>("Schedule",scheduleSchema);