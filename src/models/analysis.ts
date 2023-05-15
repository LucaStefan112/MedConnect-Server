import mongoose from "mongoose";
import { IUser, IUserModel } from "./user";
export interface IAnalysis {
    name: string;
    date: Date;
    person: IUserModel;
    path: string;
    file?: any;
}

export interface IAnalysisModel extends IAnalysis, mongoose.Document { }

const analysisSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
        default: new Date().toISOString(),
    },
    person: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },  
    path: {
        type: String,
        required: true,
    },
})

export default mongoose.model<IAnalysis>("analyses", analysisSchema);