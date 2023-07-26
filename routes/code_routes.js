import express from "express";
import { requireToken } from "../middlewares/requireToken.js";
import { getCodes, createCode, updateCode, deleteCode } from "../controllers/code_controllers.js";

const router = express.Router()

router.get('/', getCodes)
router.post('/', createCode)
router.put('/', updateCode)
router.delete('/', deleteCode)

export default router