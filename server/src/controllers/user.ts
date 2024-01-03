import { NextFunction, Request, Response } from "express";
import { User } from "../models/user.js";
import { NewUserRequestBody } from "../types/types.js";

export const newUser = async (
  req: Request<{}, {}, NewUserRequestBody>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, email, photo, gender, role, _id, dob } = req.body;
    const savedData = await User.create({
      name,
      email,
      photo,
      gender,
      role,
      _id,
      dob,
    });

    res.status(200).send({
      success: true,
      Data: savedData,
      message: "User created successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error: error,
      // message:error.message
    });
  }
};
