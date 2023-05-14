import { Request, Response } from "express";

// models
import Calendar from "../models/calendar";

export const register = async (req: Request, res: Response) => {
    const {doctor,dates} = req.body;
    console.log(req.body);
    const caled= new Calendar({
        doctor,
        dates
    });
    await caled.save();
    console.log(caled);

    return res.status(201).json({
        message: "Calendar created successfully",
    });
};