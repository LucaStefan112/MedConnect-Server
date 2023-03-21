import mongoose from "mongoose";
import { IUser, IUserModel } from "./user";
export interface IAnalysis {
    name: string;
    result: number;
    unit: string;
    person: IUserModel;
}

export interface IAnalysisModel extends IAnalysis, mongoose.Document { }

const analysisSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    result: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    person: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    }
})

export default mongoose.model<IAnalysis>("Analysis", analysisSchema);