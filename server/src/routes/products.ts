import express from "express";
const router = express.Router();

import {
    deleteProduct,
    getAdminProducts,
  getAllCategories,
  getLatestProducts,
  getSingleProduct,
  newProduct,
  updateProduct,
} from "../controllers/product.js";
import { singleUpload } from "../middlewares/multer.js";

// import { isAdmin } from "../middlewares/auth.js";


router.post("/new", singleUpload, newProduct);
router.get("/latest", getLatestProducts);
router.get("/categories", getAllCategories);
router.get("/admin-products", getAdminProducts);
router.get("/:id", getSingleProduct);
router.put("/:id", singleUpload , updateProduct);
router.delete("/:id", deleteProduct);


export default router;
