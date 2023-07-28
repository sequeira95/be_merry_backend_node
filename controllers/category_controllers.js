import { Category } from "../models/category.js"
import { nanoid } from 'nanoid'
import { uploadImgPrincipal, deleteImgPrincipal } from "../utils/imageKit.js"

export const getCategory = async (req, res) => {
  try {
    const params = req.query
    const category = await Category.find(params).lean()
    return res.json(category)
  } catch (e) {
    console.log(e)
    return  res.status(500).json({error:'Error de servidor'}) 
  }
}
export const createCategory = async (req, res) => {
  try {
    const {name, type} = req.body
    const category = new Category({
      name,
      type,
      active:true
    })
    if(req.files){
      const imagen = req.files?.imagen
      const extension = imagen.mimetype.split('/')[1]
      const namePath = `${nanoid(10)}.${extension}`
      const resImgP = await uploadImgPrincipal(imagen.data, namePath)
      category.imagen = {
        path:resImgP.filePath,
        type:extension,
        url:resImgP.url,
        name:resImgP.name,
        fileId:resImgP.fileId
      }
    }
    const newCategory = await category.save()
    return res.json(newCategory)
  } catch (e) {
    console.log(e)
    return  res.status(500).json({error:'Error de servidor'}) 
  }
}
export const editCategory = async (req, res) => {
  try{
    const {_id, name, type, activo} = req.body
    const category = await Category.findOne({_id}).lean()
    if(req?.files?.imagen){
      //Cambiar imagen anterior por la nueva, eliminar de imakit y agregar
      const categoryImg = req.files?.imagen
      const extension = categoryImg.mimetype.split('/')[1]
      const namePath = `${nanoid(10)}.${extension}`
      await deleteImgPrincipal(category.imagen.fileId)
      const resImgP = await uploadImgPrincipal(categoryImg.data, namePath)
      category.imagen = {
        path:resImgP.filePath,
        type:extension,
        url:resImgP.url,
        name:resImgP.name,
        fileId:resImgP.fileId
      }
    }
    await Category.updateOne({_id}, {
      name,
      type,
      active:activo,
      imagen:category.imagen
    })
    return res.json({status:'datos actualizado con exito'})
  }catch(e){
    console.log(e)
    return  res.status(500).json({error:'Error de servidor'}) 
  }
}
export const delteCategory = async (req, res) => {
  try{
    const {_id} = req.body
    await Category.deleteOne({_id})
    return res.json({status:'Categoria eliminada con exito'})
  }catch(e){
    console.log(e)
    return  res.status(500).json({error:'Error de servidor'}) 
  }
}