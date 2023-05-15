import { Request, Response } from "express";
import User from "../models/user";
import Analysis, { IAnalysis } from "../models/analysis";
import { UserRoles } from "../helper/enums";
import fs from "fs";

export const addAnalises = async (req: Request, res: Response) => {
    const { userId } = res.locals;
    const user = await User.findById(userId);

    if (!user) {
        return res.status(404).send({ success: false, message: 'User not found' });
    }

    const reqData: any = req;
    const file: any = reqData.files.file;

    if (!file) {
        return res.status(400).send({ success: false, message: 'No file' });
    }

    try{
        let filePath = `uploads/${userId}/${file.name}`;
        await fs.promises.mkdir(`uploads/${userId}`, { recursive: true });

        if (fs.existsSync(filePath)) {
            const newFileName = `${Date.now()}-${file.name}`;
            filePath = `uploads/${userId}/${newFileName}`;
            file.name = newFileName;
        }

        await fs.promises.writeFile(filePath, file.data);
    
        const newAnalysis = new Analysis({
            person: user,
            name: file.name,
            path: filePath,
        });

        await newAnalysis.save();

        return res.status(200).send({ success: true, message: 'analysis-added' });
    } catch (err) {
        return res.status(400).send({ success: false, message: 'Failed to add analysis' });
    }
}

export const deleteAnalysis = async (req: Request, res: Response) => {
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

    try{
        await fs.promises.unlink(analysis.path);
        await analysis.deleteOne();

        return res.status(200).send({ success: true, message: 'analysis-deleted' });
    } catch (err) {
        return res.status(400).send({ success: false, message: 'Failed to delete analysis' });
    }
}

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

    try{
        const file = await fs.promises.readFile(process.env.DIR_PATH + analysis.path);
        return res.status(200).sendFile(process.env.DIR_PATH + analysis.path);
    } catch (err) {
        return res.status(400).send({ success: false, message: 'Failed to get analysis' });
    }
}

export const getAnalyses = async (req: Request, res: Response) => {
    const { userId } = res.locals;

    const analyses = await Analysis.find({ person: userId }).populate(UserRoles.Person) as IAnalysis[];

    try{
        return res.status(200).send({ success: true, message: 'Analyses-found', analyses });
    } catch (err) {
        return res.status(400).send({ success: false, message: 'Failed to get analyses' });
    }
}