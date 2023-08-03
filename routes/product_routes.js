import express from "express";
import { requireToken } from "../middlewares/requireToken.js";
import { getProduts, createProduc, editProduct, addPhoto, deletePhotos, deleteProduct } from "../controllers/products_controllers.js";

const router = express.Router()

router.get('/', getProduts)
router.post('/', /*requireToken,*/ createProduc)
router.delete('/', /*requireToken,*/ deleteProduct)
router.post('/:productId',/* requireToken,*/ editProduct)
router.post('/addPhoto/:productId',/* requireToken,*/ addPhoto)
router.post('/deletePhotos/:productId', /*requireToken,*/ deletePhotos)


export default router