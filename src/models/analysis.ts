import mongoose from "mongoose";
export interface IAnalysis {
    name: string;
    result: number;
    unit: string;
    person: string;
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
        type: String,
        required: true,
        ref: "User",
    }
})

export default mongoose.model<IPerson>("Analysis", analysisSchema);