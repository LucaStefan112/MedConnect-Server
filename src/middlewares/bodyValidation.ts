import { Request, Response, NextFunction } from "express";
import { z } from "zod";

export const validateBody = (schema: z.ZodType<any, any>) => {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            schema.parse(req.body);
            console.log("Body validated");
            next();
        }
        catch (err) {
            console.log("Body validation failed")
            return res.status(400).send({ success: false, message: err.errors });
        }
    };
}