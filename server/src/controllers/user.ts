import { NextFunction, Request, Response } from "express";
import { User } from "../models/user.js";
import { NewUserRequestBody , Params } from "../types/types.js";
import ErrorHandler from "../utils/utility-class.js";



export const newUser = async (
  req: Request<{}, {}, NewUserRequestBody>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, email, photo, gender, _id, dob } = req.body;

    if (!name || !email || !photo || !gender || !_id || !dob) {
      return next(new ErrorHandler("All Fields Are Required", 400));
    }

    let savedUser = await User.findById(_id);
    if (savedUser) {
      return res.status(200).json({
        success: true,
        message: `Welcome , ${savedUser.name}`,
      });
    }

    savedUser = await User.create({
      name,
      email,
      photo,
      gender,
      _id,
      dob: new Date(dob),
    });

    res.status(200).send({
      success: true,
      Data: savedUser,
      message: `Welcome , ${savedUser.name}`,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllUsers = async (
  req: Request<{}, {}, NewUserRequestBody>,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await User.find({});
    res.status(200).json({
      success: true,
      Data: users,
      message: "all users fetched successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const getUser = async (
  req: Request<Params, {}, NewUserRequestBody>,
  res: Response,
  next: NextFunction
) => {
  try {
    const  id  = req.params.id;

    const user = await User.findById({ _id: id });
    if (!user) {
      return next(new ErrorHandler("User not found with this ID", 400));
    }
    res.status(200).json({
      success: true,
      data: user,
      message: "user fetched successfully",
    });
  } catch (error) {
    return next(error);
  }
};

export const deleteUser = async (
  req: Request<Params, {}, NewUserRequestBody>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const user = await User.findById({ _id: id });
    if (!user) {
      return next(new ErrorHandler("User not found with this ID", 400));
    }

    const deleteUser = await user.deleteOne();

    if (!deleteUser) {
      return next(new ErrorHandler("Delete user failed", 402));
    }

    res.status(200).json({
      success: true,
      data: deleteUser,
      message: "User deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
