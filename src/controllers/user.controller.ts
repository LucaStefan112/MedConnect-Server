import { Request, Response } from "express";
import jwt from "jsonwebtoken";

// models
import User, { IUser } from "../models/user";

// enums
import { UserRoles } from "../helper/enums";

// helpers
import { IBasicResponse } from "../helper/response";
import utils from "../helper/utils";

export const getUser = async (req: Request, res: IBasicResponse) => {
  const { userId } = res.locals;
  const user = await User.findById(userId);

  if (!user) {
    return res.status(404).send({ success: false, message: "User not found" });
  }

  return res.status(200).send({ success: true, message: "User found", user });
}

export const updateUser = async (req: Request, res: IBasicResponse) => {
  const data: IUser = req.body;

  try {
    const { userId } = res.locals;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).send({ success: false, error: "User not found" });
    }

    // update user data
    await user.updateOne({
      firstName: data.firstName ?? user.firstName,
      lastName: data.lastName ?? user.lastName,
      cnp: data.cnp ?? user.cnp,
      dateOfBirth: new Date(data.dateOfBirth ?? user.dateOfBirth),
      sex: data.sex ?? user.sex,
      citizenship: data.citizenship ?? user.citizenship,
      country: data.country ?? user.country,
      county: data.county ?? user.county,
      city: data.city ?? user.city,
      completeAddress: data.completeAddress ?? user.completeAddress,
      phoneNumber: data.phoneNumber ?? user.phoneNumber,
    });


    // if role is doctor, update specialization
    if (user.role === UserRoles.Doctor) {
      const { specialization } = req.body;
      await user!.updateOne({
        specialization: specialization ?? user.specialization,
      });
    }

    // admin can change role
    if (user.role === UserRoles.Admin) {
      await user!.updateOne({
        role: data.role ?? user.role,
      });
    }

    await user.save();
    const updatedUser = await User.findById(userId);
    return res.status(200).send({ success: true, message: "User updated", user: updatedUser });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ error });
  }
}

// For test purposes
export const register = async (req: Request, res: IBasicResponse) => {
  const { firstName, lastName, email, password, role, dateOfBirth, phoneNumber } = req.body;
  const hashedPassword = utils.hash256(password);
  try {
    const user = await User.create({
      firstName: firstName,
      lastName: lastName,
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
  let { token } = req.cookies;

  const user = await User.findOne({ email: email, password: utils.hash256(password) });

  if (!user) {
    return res.status(404).send({ success: false, message: "User not found" });
  }

  if(token) {
    // clear token
    res.clearCookie("token");
  }

  token = jwt.sign({ id: user._id }, process.env.JWT_KEY);

  res.cookie("token", token, {
    httpOnly: true,
    maxAge: 1 * 60 * 60 * 1000 // 1 hour
  }).status(200).send({ success: true, message: "User logged in" });
  return res.end();
}