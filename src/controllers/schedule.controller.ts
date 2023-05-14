import { Request, Response } from "express";

// models
import Schedule from "../models/schedule";

export const register = async (req: Request, res: Response) => {
    try {
        const {doctor,dates,patients} = req.body;
        console.log("Body: " + req.body);
        console.log("Dates: " + req.body.dates);
        const sched= new Schedule({
            doctor,
            dates,
            patients
        });
        console.log("Sched Object: " + sched);
        await sched.save();
        console.log(sched);
    
        return res.status(201).json({
            success: true,
            message: "Schedule created successfully",
        });
    }
    catch(err){
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "Internal server error", 
        });
    }
};