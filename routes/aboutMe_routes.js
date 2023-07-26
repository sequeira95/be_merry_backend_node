import express from "express";
import { requireToken } from "../middlewares/requireToken.js";
import { createEmpresa, getEmpresa } from "../controllers/aboutMe_controllers.js";

const router = express.Router()

router.get('/', getEmpresa)
router.post('/', /*requireToken,*/ createEmpresa)


export default router