import mongoose from "mongoose";
export interface ISpecialisation {
    name: string;
}

export interface ISpecialisationModel extends ISpecialisation, mongoose.Document { }

const specialisationSchema = new mongoose.Schema({
    doctorId: {
        type: String,
        required: true,
    },
    monday: {
        type: Array,
        required: true,
    },
    tuesday: {
        type: Array,
        required: true,
    },
    wednesday: {  
        type: Array,
        required: true,
    },
    thursday: {
        type: Array,
        required: true,
    },
    friday: {
        type: Array,
        required: true,
    },
  })

export default mongoose.model<ISpecialisation>("doctor_interval", specialisationSchema);

