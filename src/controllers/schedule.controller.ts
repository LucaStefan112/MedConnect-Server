import { Request, Response } from "express";

// models
import Schedule from "../models/schedule";

export const register = async (req: Request, res: Response) => {
    const {doctor,dates} = req.body;
    const sched= new Schedule({
        doctor,
        dates
    });
    await sched.save();
    console.log(sched);

    return res.status(201).json({
        message: "Schedule created successfully",
    });
};