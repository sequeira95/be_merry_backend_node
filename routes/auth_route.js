import express from "express";
import { login, register, refreshToken, logout} from "../controllers/auth_controllers.js";
import { requireToken } from "../middlewares/requireToken.js";
import { requireRefreshToken } from "../middlewares/requireRefreshToken.js";
import { validationLoginRegister } from "../middlewares/validationManager.js";

const router = express.Router()

router.post('/register',validationLoginRegister, register)
router.post('/login', validationLoginRegister,login)
router.get('/refresh', requireRefreshToken, refreshToken)
router.get('logout', requireRefreshToken,logout)

export default router;