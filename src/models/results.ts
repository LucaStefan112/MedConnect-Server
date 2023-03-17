import mongoose from "mongoose";
export interface IResults{
    name: string;
    result: number;
    unit: string;
    person: string;
}

export interface IPerson extends IResults, mongoose.Document { }

const resultsSchema= new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    result:{
        type: Number,
        required: true,
    },
    unit:{
        type: String,
        required: true,
    },
    person:{
        type: String,
        required: true,
        ref: "User",
    }
})

export default mongoose.model<IPerson>("Result", resultsSchema);