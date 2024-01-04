import { NextFunction, Request, Response } from "express";
import { Product } from "../models/product.js";
import { NewProductRequestBody } from "../types/types.js";
import ErrorHandler from "../utils/utility-class.js";
import { rm } from "fs";

export const newProduct = async (
  req: Request<{}, {}, NewProductRequestBody>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, category, price, stock } = req.body;
    const photo = req.file;
    console.log(name , category , price , stock , photo);

    if (!photo) {
        return next(new ErrorHandler("Please add Photo", 400));
    }

    if (!name || !price || !stock || !category) {
      rm(photo.path, () => {
        console.log("Deleted");
      });
      return next(new ErrorHandler("Please enter All Fields", 400));
    }

    const savedProduct = await Product.create({
      name,
      price,
      stock,
      category: category.toLowerCase(),
      photo: photo.path,
    });

    if (!savedProduct) {
      return next(new ErrorHandler("Error in saving Data", 401));
    }

    res.status(200).json({
      success: true,
      data: savedProduct,
      message: "Product ceated successfully",
    });
    
  } catch (error) {
    next(error);
  }
};
