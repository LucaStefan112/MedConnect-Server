import mongoose from "mongoose";
export interface ISpecialisation {
    name: string;
}

export interface ISpecialisationModel extends ISpecialisation, mongoose.Document { }

const specialisationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
})

export default mongoose.model<ISpecialisation>("Specialisations", specialisationSchema);

