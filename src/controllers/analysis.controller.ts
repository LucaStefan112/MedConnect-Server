import { Request, Response } from "express";
import User from "../models/user";
import Analysis from "../models/analysis";

export const getAnalyses = async (req: Request, res: Response) => {
    const { userId } = res.locals;
    const user = await User.findById(userId);

    const analyses = await Analysis.find({
        person: user,
    }).populate("doctor");

    return res.status(200).send({ succes: true, message: 'analyses-found', analyses });
};

export const getAnalysis = async (req: Request, res: Response) => {
    const { id } = req.params;
    const analysis = await Analysis.findById(id).populate('person');

    if (!analysis) {
        return res.status(404).send({ succes: false, message: 'Analysis not found' });
    }

    if (analysis.person._id !== res.locals.userId) {
        return res.status(401).send({ succes: false, message: 'Unauthorized' });
    }

    return res.status(200).send({ succes: true, message: 'analysis-found', analysis });
};

