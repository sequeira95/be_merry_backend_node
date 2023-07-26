import { Product } from "../models/Products.js"
import { User } from '../models/User.js'
import { nanoid } from 'nanoid'
import { uploadImgPrincipal, uploadOtherImg, deleteImgPrincipal } from "../utils/imageKit.js"
import moment from "moment"

export const getProduts = async (req, res) => {
  try {
    const products = await Product.find().lean()
    return res.json({products})
  } catch (e) {
    console.log(e)
    return  res.status(500).json({error:'Error de servidor'}) 
  }
}
export const createProduc = async (req, res) => {
  try {
    const user = await User.findOne({_id:req.uid}).lean()
    const {name,description,price,quanty,colors,size, typeProduct, code} = req.body
    const product = new Product({
      name,
      description,
      price,
      quanty,
      colors,
      size,
      code,
      creadorId:user._id,
      creadoPor:`${user.name} ${user.lastName}`,
      typeProduct,
      registrationDate: moment().toDate()
    })
    console.log(req.files)
    if(req.files){
      const imgPrincipal = req.files?.principalImg
      const otherImg = req.files?.otherImg
      const extension = imgPrincipal.mimetype.split('/')[1]
      const namePath = `${nanoid(10)}.${extension}`
      const resImgP = await uploadImgPrincipal(imgPrincipal.data, namePath)
      console.log('imagen', resImgP)
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
          const resOtherImg = await uploadOtherImg(o.data, otherNamePath)
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
    console.log('creado',product)
    const newProduct = await product.save()
    return res.json({newProduct})
  } catch (e) {
    console.log(e)
    return  res.status(500).json({error:'Error de servidor'}) 
  }
}
export const editProduct = async (req, res) => {
  try{
    const {name,description,price,quanty,size, typeProduct, _id,code} = req.body
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
      imgPrincipal:product.imgPrincipal
    })
    return res.json({status:'Producto actualizado con exito'})
  }catch(e){
    console.log(e)
    return  res.status(500).json({error:'Error de servidor'}) 
  }

}
export const addPhoto = async (req, res) => {
  try{
    console.log('prueba',req.files)
    const otherImg = req.files?.otherImg
    let imgMulti = []
    if(otherImg && otherImg[0]){
      for(let o of otherImg){
        const otherExtension = o.mimetype.split('/')[1]
        const otherNamePath = `${nanoid(10)}.${otherExtension}`
        const resOtherImg = await uploadOtherImg(o.data, otherNamePath)
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
      const resOtherImg = await uploadOtherImg(otherImg.data, otherNamePath)
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
      await deleteImgPrincipal(photo.fileId)
      idPhotos.push(photo.fileId)
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