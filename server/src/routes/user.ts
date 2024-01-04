import express from "express";
const router = express.Router(); 

import { newUser , getAllUsers , getUser , deleteUser } from "../controllers/user.js";
import { isAdmin } from "../middlewares/auth.js";


router.post('/new',isAdmin , newUser )
router.get('/all',isAdmin , getAllUsers )
router.get('/:id',isAdmin , getUser )
router.delete('/:id',isAdmin , deleteUser )



export default router;