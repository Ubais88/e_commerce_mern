import express from "express";
const router = express.Router(); 

import { newUser , getAllUsers , getUser , deleteUser } from "../controllers/user.js";
import { isAdmin } from "../middlewares/auth.js";


router.post('/new', newUser )
router.get('/all',isAdmin , getAllUsers )
router.get('/:id' , getUser )
router.delete('/:id',isAdmin , deleteUser )



export default router;