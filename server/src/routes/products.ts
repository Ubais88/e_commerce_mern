import express from "express";
const router = express.Router();


import { newProduct } from "../controllers/product.js";
import { singleUpload } from "../middlewares/multer.js";
import { isAdmin } from "../middlewares/auth.js";


router.post('/new' ,isAdmin , singleUpload , newProduct );



export default router;