import { NextFunction, Request, Response } from "express";
import { NewUserRequestBody } from "../types/types.js";
import ErrorHandler from "../utils/utility-class.js";
import { User } from "../models/user.js";

// middleware to check admin or not
export const isAdmin = async(
  req: Request<{}, {}, NewUserRequestBody>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.query;

    if(!id){
        return next(new ErrorHandler("Please Login First/",401))
    }
418
    const user = await User.findById(id);

    if(!user){
        return next(new ErrorHandler("INVALID ID",401))
    }

    if(user.role.toLocaleLowerCase() !== "admin"){
        return next(new ErrorHandler("User is NOT Admin",401))
    }
    next()

  } catch (error) {
    next(error)
  }
};
