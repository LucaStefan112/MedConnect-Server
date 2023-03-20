import mongoose from "mongoose";
import { IUser, IUserModel } from "./user";
export interface IAnalysis {
    name: string;
    result: number;
    unit: string;
    person: IUserModel;
}

export interface IPerson extends IAnalysis, mongoose.Document { }

const analysisSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    result: {
        type: Number,
        required: true,
    },
    unit: {
        type: String,
        required: true,
    },
    person: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    }
})

export default mongoose.model<IPerson>("Analysis", analysisSchema);