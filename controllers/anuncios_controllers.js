import { Anuncios } from "../models/anuncios.js"
import { nanoid } from 'nanoid'
import { uploadImgPrincipal, deleteImgPrincipal } from "../utils/imageKit.js"

export const getAnuncios = async (req, res) => {
  try {
    const params = req.query
    const anuncios = await Anuncios.find(params).lean()
    return res.json(anuncios)
  } catch (e) {
    console.log(e)
    return  res.status(500).json({error:'Error de servidor'}) 
  }
}
export const createAnuncio = async (req, res) => {
  try {
    const {name, type, category, descripcion} = req.body
    console.log('body',req.body)
    const anuncio = new Anuncios({
      name,
      type,
      category,
      descripcion,
      active:true
    })
    console.log('file',req.files)
    if(req.files){
      const imagen = req.files?.imagen
      const extension = imagen.mimetype.split('/')[1]
      const namePath = `${nanoid(10)}.${extension}`
      const resImgP = await uploadImgPrincipal(imagen.data, namePath)
      anuncio.imagen = {
        path:resImgP.filePath,
        type:extension,
        url:resImgP.url,
        name:resImgP.name,
        fileId:resImgP.fileId
      }
    }
    const newAnuncio = await anuncio.save()
    return res.json(newAnuncio)
  } catch (e) {
    console.log(e)
    return  res.status(500).json({error:'Error de servidor'}) 
  }
}
export const editAnuncio = async (req, res) => {
  try{
    const {_id, name, type, activo, category, descripcion} = req.body
    const anuncio = await Anuncios.findOne({_id}).lean()
    if(req?.files?.imagen){
      //Cambiar imagen anterior por la nueva, eliminar de imakit y agregar
      const imagen = req.files?.imagen
      const extension = imagen.mimetype.split('/')[1]
      const namePath = `${nanoid(10)}.${extension}`
      await deleteImgPrincipal(anuncio.imagen.fileId)
      const resImgP = await uploadImgPrincipal(imagen.data, namePath)
      anuncio.imagen = {
        path:resImgP.filePath,
        type:extension,
        url:resImgP.url,
        name:resImgP.name,
        fileId:resImgP.fileId
      }
    }
    await Anuncios.updateOne({_id}, {
      name,
      type,
      descripcion,
      category,
      active:activo,
      imagen:category.imagen
    })
    return res.json({status:'datos actualizado con exito'})
  }catch(e){
    console.log(e)
    return  res.status(500).json({error:'Error de servidor'}) 
  }
}
export const deleteAnuncio = async (req, res) => {
  try{
    const {_id} = req.body
    const anunucio = await Anuncios.findOne({_id}).lean()
    await deleteImgPrincipal(anunucio.imagen.fileId)
    await Anuncios.deleteOne({_id})
    return res.json({status:'Anuncio eliminada con exito'})
  }catch(e){
    console.log(e)
    return  res.status(500).json({error:'Error de servidor'}) 
  }
}