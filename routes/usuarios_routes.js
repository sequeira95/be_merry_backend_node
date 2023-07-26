import express from "express";
import { requireToken } from "../middlewares/requireToken.js";
import { getUsers, createUserAdministrator, updateUser, deleteUser } from "../controllers/usuarios_controllers.js";

const router = express.Router()

router.get('/', getUsers)
router.post('/', createUserAdministrator)
router.put('/', updateUser)
router.delete('/', deleteUser)

export default router