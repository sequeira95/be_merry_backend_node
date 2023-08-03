import express from "express";
import { requireToken } from "../middlewares/requireToken.js";
import { getAnuncios, createAnuncio, editAnuncio, deleteAnuncio } from "../controllers/anuncios_controllers.js";

const router = express.Router()

router.get('/', getAnuncios)
router.post('/', /*requireToken,*/ createAnuncio)
router.put('/', /*requireToken,*/ editAnuncio)
router.delete('/', /*requireToken,*/ deleteAnuncio)


export default router