import express from "express";
import { requireToken } from "../middlewares/requireToken.js";
import { getProduts, createProduc, editProduct, addPhoto, deletePhotos, deleteProduct,getProduct } from "../controllers/products_controllers.js";

const router = express.Router()

router.get('/', getProduts)
router.post('/', /*requireToken,*/ createProduc)
router.delete('/', /*requireToken,*/ deleteProduct)
router.get('/:productId',/* requireToken,*/ getProduct)
router.post('/:productId',/* requireToken,*/ editProduct)
router.post('/addPhoto/:productId',/* requireToken,*/ addPhoto)
router.post('/deletePhotos/:productId', /*requireToken,*/ deletePhotos)


export default router