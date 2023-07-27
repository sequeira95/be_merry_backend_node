import express from "express";
import { requireToken } from "../middlewares/requireToken.js";
import { getCategory, createCategory } from "../controllers/category_controllers.js";

const router = express.Router()

router.get('/', getCategory)
router.post('/', /*requireToken,*/ createCategory)


export default router