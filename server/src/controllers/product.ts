import { NextFunction, Request, Response } from "express";
import { Product } from "../models/product.js";
import { NewProductRequestBody, Params } from "../types/types.js";
import ErrorHandler from "../utils/utility-class.js";
import { rm } from "fs";

export const newProduct = async (
  req: Request<{}, {}, NewProductRequestBody>,
  res: Response,
  next: NextFunction
) => {
  try {
    // const { name, category, price, stock } = req.body;
    // const photo = req.file;
    // console.log(name , category , price , stock , photo);

    // if (!photo) {
    //     return next(new ErrorHandler("Please add Photo", 400));
    // }

    // if (!name || !price || !stock || !category) {
    //   rm(photo.path, () => {
    //     console.log("Deleted");
    //   });
    //   return next(new ErrorHandler("Please enter All Fields", 400));
    // }

    // const savedProduct = await Product.create({
    //   name,
    //   price,
    //   stock,
    //   category: category.toLowerCase(),
    //   photo: photo.path,
    // });


    // res.status(200).json({
    //   success: true,
    //   data: savedProduct,
    //   message: "Product ceated successfully",
    // });

    const { name, price, stock, category } = req.body;
    const photo = req.file;

    if (!photo) return next(new ErrorHandler("Please add Photo", 400));

    if (!name || !price || !stock || !category) {
      rm(photo.path, () => {
        console.log("Deleted");
      });

      return next(new ErrorHandler("Please enter All Fields", 400));
    }
    await Product.create({
      name,
      price,
      stock,
      category: category.toLowerCase(),
      photo: photo.path,
    });
    return res.status(201).json({
      success: true,
      message: "Product Created Successfully",
    });
  } catch (error) {
    next(error);
  }
};



export const getLatestProducts = async (
  req: Request<{}, {}, NewProductRequestBody>,
  res: Response,
  next: NextFunction
) => {
  try {
    const products = await Product.find({}).sort({ createdAt: -1 }).limit(5);

    res.status(200).json({
      success: true,
      data: products,
      message: "latest 5 products fetched successfully",
    });
  } catch (error) {
    next(error);
  }
};


export const getAllCategories = async (
  req: Request<{}, {}, NewProductRequestBody>,
  res: Response,
  next: NextFunction
) => {
  try {
    const categories = await Product.distinct("category");
    res.status(200).json({
      success: true,
      data: categories,
      message: "all categories fetched successfully",
    });
  } catch (error) {
    next(error);
  }
};


export const getAdminProducts = async (
  req: Request<{}, {}, NewProductRequestBody>,
  res: Response,
  next: NextFunction
) => {
  try {
    const products = await Product.find();

    res.status(200).json({
      success: true,
      data: products,
      message: "all admin products fetched successfully",
    });

  } catch (error) {
    next(error);
  }
};


export const getSingleProduct = async (
  req: Request<Params, {}, NewProductRequestBody>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if(!product) {
      return next(new ErrorHandler("Product not found",404))
    }
    res.status(200).json({
      success: true,
      data: product,
      message: "product details fetched successfully",
    });

  } catch (error) {
    next(error);
  }
};


export const updateProduct = async (
  req: Request<Params, {}, NewProductRequestBody>,
  res: Response,
  next: NextFunction
) => {
  try {

    const {id} = req.params;
    const { name, category, price, stock } = req.body;
    const photo = req.file;
    const product = await Product.findById(id);
    if(!product) {
      return next(new ErrorHandler("Product not found",404))
    }
    if(photo){
      rm(product.photo, () => {
        console.log("old photo Deleted");
      });
      product.photo = photo.path;
    }

    if(name) product.name = name;
    if(price) product.price = price;
    if(category) product.category = category;
    if(stock) product.stock = stock;
   
    const updateProduct = await product.save();

    res.status(200).json({
      success: true,
      data: updateProduct,
      message: "Product updated successfully",
    });
  } 
  catch (error) {
    next(error);
  }
};


export const deleteProduct = async (
  req: Request<Params, {}, NewProductRequestBody>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if(!product) {
      return next(new ErrorHandler("Product not found",404))
    }
    rm(product.photo, () => {
      console.log("photo Deleted");
    });
    const deletedProduct = await Product.deleteOne();
    res.status(200).json({
      success: true,
      data: deletedProduct,
      message: "product deleted successfully",
    });

  } catch (error) {
    next(error);
  }
};