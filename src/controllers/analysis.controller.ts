import { Request, Response } from "express";
import User from "../models/user";
import Analysis from "../models/analysis";
import { UserRoles } from "../helper/enums";

export const register = async (req: Request, res: Response) => {
    const { name, result, date, person } = req.body;
    const rez = new Analysis({
        name,
        result,
        date,
        person,
    });
    rez.date = new Date();
    await rez.save();

    return res.status(201).json({
        message: "Added results successfully",
    });
};

export const getAnalyses = async (req: Request, res: Response) => {
    const { userId } = res.locals;
    const user = await User.findById(userId);

    if (!user) {
        return res.status(404).send({ success: false, message: 'User not found' });
    }

    const analyses = await Analysis.find({ person: user });

    return res.status(200).send({ success: true, message: 'analyses-found', analyses });
};

export const getAnalysis = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { userId } = res.locals;

    if(!id) {
        return res.status(400).send({ success: false, message: 'Bad request' });
    }

    const analysis = await Analysis.findById(id).populate(UserRoles.Person);

    if (!analysis) {
        return res.status(404).send({ success: false, message: 'Analysis not found' });
    }

    if (analysis.person._id.valueOf() !== userId) {
        return res.status(401).send({ success: false, message: 'Unauthorized' });
    }

    return res.status(200).send({ success: true, message: 'analysis-found', analysis });
};