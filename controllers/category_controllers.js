import { Category } from "../models/category.js"
import { nanoid } from 'nanoid'
import { uploadImgPrincipal } from "../utils/imageKit.js"

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
    console.log(req.body)
    const {name, type} = req.body
    const category = new Category({
      name,
      type,
      active:true
    })
    console.log(req.files)
    if(req.files){
      const imagen = req.files?.imagen
      const extension = imagen.mimetype.split('/')[1]
      const namePath = `${nanoid(10)}.${extension}`
      const resImgP = await uploadImgPrincipal(imagen.data, namePath)
      console.log('imagen', resImgP)
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
/*export const editEmpresa = async (req, res) => {
  try{
    const {name, history, _id} = req.body
    const aboutMe = await AboutMe.findOne({_id}).lean()
    console.log('producto', aboutMe)
    if(req?.files?.logo){
      //Cambiar imagen anterior por la nueva, eliminar de imakit y agregar
      const logo = req.files?.logo
      console.log(logo)
      const extension = logo.mimetype.split('/')[1]
      const namePath = `${nanoid(10)}.${extension}`
      await deleteImgPrincipal(aboutMe.logo.fileId)
      const resImgP = await uploadImgPrincipal(logo.data, namePath)
      console.log('imagen', resImgP)
      aboutMe.logo = {
        path:resImgP.filePath,
        type:extension,
        url:resImgP.url,
        name:resImgP.name,
        fileId:resImgP.fileId
      }
    }
    await AboutMe.updateOne({_id}, {
      name,
      history,
      logo:aboutMe.logo
    })
    return res.json({status:'datos actualizado con exito'})
  }catch(e){
    console.log(e)
    return  res.status(500).json({error:'Error de servidor'}) 
  }

}*/