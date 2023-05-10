import { Request, Response } from "express";

// models
import Schedule from "../models/schedule";

export const register = async (req: Request, res: Response) => {
    const {doctor,dates,patients} = req.body;
    const sched= new Schedule({
        doctor,
        dates,
        patients
    });
    await sched.save();
    console.log(sched);

    return res.status(201).json({
        message: "Schedule created successfully",
    });
};