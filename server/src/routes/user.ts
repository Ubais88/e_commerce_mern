import express from "express";
const router = express.Router(); 

import { newUser , getAllUsers , getUser } from "../controllers/user.js";


router.post('/new', newUser )
router.get('/all', getAllUsers )
router.get('/:id', getUser )



export default router;