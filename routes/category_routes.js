import express from "express";
import { requireToken } from "../middlewares/requireToken.js";
import { getCategory, createCategory, editCategory, delteCategory } from "../controllers/category_controllers.js";

const router = express.Router()

router.get('/', getCategory)
router.post('/', /*requireToken,*/ createCategory)
router.put('/', /*requireToken,*/ editCategory)
router.delete('/', /*requireToken,*/ delteCategory)


export default router