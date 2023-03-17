import { Request, Response } from "express";
import jwt from "jsonwebtoken";

// models
import User from "../models/user";
import Appointment from "../models/appointment";
import Result from "../models/results";

// enums
import { UserRoles, AppointmentTypes } from "../helper/enums";

// helpers
import { IBasicResponse } from "../helper/response";
import utils from "../helper/utils";

export const getUser = async (req: Request, res: IBasicResponse) => {
    const userId = req.body.user._id;

    console.log(userId);
    const user = await User.findOne({ _id: userId });
    console.log("user\n\n", user);
    if (!user) {
        return res.status(404).send({ success: false, message: "User not found" });
    }

    const data = {
        fullName: user.fullName,
        email: user.email,
        role: user.role,
        dateOfBirth: user.dateOfBirth,
        phoneNumber: user.phoneNumber,
        specialization: user.specialization,
    }

    return res.status(200).send({ success: true, message: "User found", user });
}

export const getAppointments = async (req: Request, res: IBasicResponse) => {
    const userId = req.body.user._id;
    try {
        const user = await User.findOne({ _id: userId });
        if (!user) {
            return res.status(404).send({ success: false, message: "User not found" });
        }

        const appointments = (user.role === UserRoles.Patient) ?
            await Appointment.find({ patient: userId })
            : await Appointment.find({ doctor: userId });

        return res.status(200).send({ success: true, message: "Appointments found", appointments });
    } catch (error) {
        return res.status(500).send({ success: false, message: "Appointments not found", error });
    }
}

export const getResults = async (req: Request, res: IBasicResponse) => {
    const userId = req.body.user._id;
    try {
        const results = await Result.find({ person: userId });
        return res.status(200).send({ success: true, message: "Results found", results });
    } catch (error) {
        return res.status(500).send({ success: false, message: "Results not found", error });
    }
}

export const updateUser = async (req: Request, res: IBasicResponse) => {
    const userId = req.body.user._id;
    const { fullName, email, password, role, dateOfBirth, phoneNumber } = req.body;

    try {
        const user = await User.findOne({ _id: userId });
        if (!user) {
            return res.status(404).send({ error: "User not found" });
        }

        await user!.updateOne({
            fullName: fullName ?? user.fullName,
            email: email ?? user.email,
            password: password ?? user.password,
            dateOfBirth: dateOfBirth ?? user.dateOfBirth,
            phoneNumber: phoneNumber ?? user.phoneNumber,
        });

        // if role is doctor, update specialization
        if (role === UserRoles.Doctor) {
            const { specialization } = req.body;
            await user!.updateOne({
                specialization: specialization ?? user.specialization,
            });
        }

        // admin can change role
        if (role === UserRoles.Admin) {
            await user!.updateOne({
                role: role ?? user.role,
            });
        }

        await user.save();
    } catch (error) {
        return res.status(500).send({ error });
    }
}

// For test purposes
export const register = async (req: Request, res: IBasicResponse) => {
    const { fullName, email, password, role, dateOfBirth, phoneNumber } = req.body;
    const hashedPassword = utils.hash256(password);
    try {
        const user = await User.create({
            fullName: fullName,
            email: email,
            password: hashedPassword,
            role: role,
            dateOfBirth: dateOfBirth,
            phoneNumber: phoneNumber,
        });

        await user.save();

        return res.status(200).send({ success: true, message: "User created", user });
    } catch (error) {
        return res.status(500).send({ success: false, message: "User not created", error });
    }
}

// For test purposes
export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const { JWT_KEY } = process.env;

    const user = await User.findOne({ email: email, password: utils.hash256(password) });

    if (!user) {
        return res.status(404).send({ success: false, message: "User not found" });
    }

    const token = jwt.sign({ user }, JWT_KEY);

    res.send({ email: user.email, token: token });
}
