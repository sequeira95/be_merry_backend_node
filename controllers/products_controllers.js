import { Product } from "../models/Products.js"
import { User } from '../models/User.js'
import { Code } from '../models/codeProduct.js'
import { nanoid } from 'nanoid'
import { uploadImgPrincipal, uploadOtherImg, deleteImgPrincipal } from "../utils/imageKit.js"
import moment from "moment"

export const getProduts = async (req, res) => {
  try {
    const params = req.query
    const products = await Product.find(params).populate('code').populate('anuncio').lean()
    return res.json(products)
  } catch (e) {
    console.log(e)
    return  res.status(500).json({error:'Error de servidor'}) 
  }
}
export const getProduct = async (req, res) =>{
  const params = req.params
  try{
    const product = await Product.findOne({_id:params.productId}).lean()
    return res.json(product)
  }catch (e){
    console.log(e)
    return  res.status(500).json({error:'Error de servidor'}) 
  }
}
export const createProduc = async (req, res) => {
  try {
    //const user = await User.findOne({_id:req.uid}).lean()
    const {name,description,price,quanty,colors,size, typeProduct, code, category, descuentoPrecio, anuncio } = req.body
    const product = new Product({
      name,
      description,
      price,
      quanty,
      colors,
      size,
      code,
      category,
      descuentoPrecio,
      anuncio,
      /*creadorId:user._id,
      creadoPor:`${user.name} ${user.lastName}`,*/
      typeProduct,
      registrationDate: moment().toDate()
    })
    if(req.files){
      const imgPrincipal = req.files?.principalImg
      const otherImg = req.files?.otherImg
      const extension = imgPrincipal.mimetype.split('/')[1]
      const namePath = `${nanoid(10)}.${extension}`
      const resImgP = await uploadImgPrincipal(imgPrincipal.data, namePath)
      product.imgPrincipal = {
        path:resImgP.filePath,
        type:extension,
        url:resImgP.url,
        name:resImgP.name,
        fileId:resImgP.fileId
      }
      let imgMulti = []
      if(otherImg && otherImg[0]){
        for(let o of otherImg){
          const otherExtension = o.mimetype.split('/')[1]
          const otherNamePath = `${nanoid(10)}.${otherExtension}`
          const resOtherImg = await uploadImgPrincipal(o.data, otherNamePath)
          imgMulti.push({
            path:resOtherImg.filePath,
            type:otherExtension,
            url:resOtherImg.url,
            name:resOtherImg.name,
            fileId:resOtherImg.fileId
          })
        }
      }
      product.otherImg = imgMulti
    }
    const newProduct = await product.save()
    return res.json(newProduct)
  } catch (e) {
    console.log(e)
    return  res.status(500).json({error:'Error de servidor'}) 
  }
}
export const editProduct = async (req, res) => {
  try{
    const {name,description,price,quanty,colors,size, typeProduct, code, category, descuentoPrecio, anuncio, _id} = req.body
    console.log('body', req.body)
    const product = await Product.findOne({_id}).lean()
    console.log('producto', product)
    if(req?.files?.principalImg){
      //Cambiar imagen anterior por la nueva, eliminar de imakit y agregar
      const imgPrincipal = req.files?.principalImg
      console.log(imgPrincipal)
      const extension = imgPrincipal.mimetype.split('/')[1]
      const namePath = `${nanoid(10)}.${extension}`
      await deleteImgPrincipal(product.imgPrincipal.fileId)
      const resImgP = await uploadImgPrincipal(imgPrincipal.data, namePath)
      console.log('imagen', resImgP)
      product.imgPrincipal = {
        path:resImgP.filePath,
        type:extension,
        url:resImgP.url,
        name:resImgP.name,
        fileId:resImgP.fileId
      }
    }
    await Product.updateOne({_id}, {
      name,
      description,
      price,
      quanty,
      size,
      code,
      typeProduct,
      imgPrincipal:product.imgPrincipal,
      colors,
      category,
      descuentoPrecio,
      anuncio,
    })
    return res.json({status:'Producto actualizado con exito'})
  }catch(e){
    console.log(e)
    return  res.status(500).json({error:'Error de servidor'}) 
  }

}
export const deleteProduct = async (req, res) => {
  try{
    const {_id} = req.body
    const product = await Product.findOne({_id}).lean()
    console.log(product)
    await deleteImgPrincipal(product.imgPrincipal.fileId)
    if(product.otherImg[0]){
      for(let o of product.otherImg){
        await deleteImgPrincipal(o.fileId)
      }
    }
    await Product.deleteOne({_id})
    return res.json({status:'Producto eliminado con exito'})
  }catch(e){
    console.log(e)
    return  res.status(500).json({error:'Error de servidor'}) 
  }
}
export const addPhoto = async (req, res) => {
  try{
    console.log('prueba',req.files)
    console.log(req.body)
    const otherImg = req.files?.otherImg
    let imgMulti = []
    if(otherImg && otherImg[0]){
      for(let o of otherImg){
        const otherExtension = o.mimetype.split('/')[1]
        const otherNamePath = `${nanoid(10)}.${otherExtension}`
        const resOtherImg = await uploadImgPrincipal(o.data, otherNamePath)
        imgMulti.push({
          path:resOtherImg.filePath,
          type:otherExtension,
          url:resOtherImg.url,
          name:resOtherImg.name,
          fileId:resOtherImg.fileId
        })
      }
    }else{
      const otherExtension = otherImg.mimetype.split('/')[1]
      const otherNamePath = `${nanoid(10)}.${otherExtension}`
      const resOtherImg = await uploadImgPrincipal(otherImg.data, otherNamePath)
      imgMulti.push({
        path:resOtherImg.filePath,
        type:otherExtension,
        url:resOtherImg.url,
        name:resOtherImg.name,
        fileId:resOtherImg.fileId
      })
    }
    console.log('imagenbes',imgMulti)
    const product = await Product.findOne({_id:req.body._id}).lean()
    if(product && product.otherImg && product.otherImg[0]) {
      console.log('producto',product)
      imgMulti.push(...product.otherImg)
    }
    console.log('imagenbes',imgMulti)
    await Product.updateOne({_id:req.body._id}, {
      otherImg:imgMulti
    })
    return res.json({otherImg:imgMulti})

  }catch (e) {
    console.log(e)
    return  res.status(500).json({error:'Error de servidor'}) 
  }
}
export const deletePhotos = async (req, res) => {
  console.log('datos', req.body)
  const {productId, photos} = req.body
  try {
    const product = await Product.findOne({_id:productId})
    let idPhotos = []
    for(let photo of photos){
      await deleteImgPrincipal(photo)
      idPhotos.push(photo)
    }
    const photoUpdate = product.otherImg.filter(e => !idPhotos.includes(e.fileId))
    product.otherImg = photoUpdate
    const newProduct = await product.save()
    return res.json({newProduct})

    
  } catch (e) {
    console.log(e)
    return  res.status(500).json({error:'Error de servidor'})
    
  }
  return
}