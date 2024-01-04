import express from "express";
const router = express.Router();


import { getAllCategories, getLatestProducts, newProduct } from "../controllers/product.js";
import { singleUpload } from "../middlewares/multer.js";
import { isAdmin } from "../middlewares/auth.js";


router.post('/new' , singleUpload , newProduct )
router.get('/latest' , getLatestProducts )
router.get('/categories' , getAllCategories )




export default router;