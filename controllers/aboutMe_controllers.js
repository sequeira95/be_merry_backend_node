import { AboutMe } from "../models/aboutMe.js"
import { nanoid } from 'nanoid'
import { uploadImgPrincipal, deleteImgPrincipal } from "../utils/imageKit.js"

export const getEmpresa = async (req, res) => {
  try {
    const aboutMe = await AboutMe.findOne().lean()
    return res.json(aboutMe)
  } catch (e) {
    console.log(e)
    return  res.status(500).json({error:'Error de servidor'}) 
  }
}
export const createEmpresa = async (req, res) => {
  try {
    const {name, history} = req.body
    const empresa = new AboutMe({
      name,
      history,
    })
    if(req.files){
      const logo = req.files?.logo
      const extensionLogo = logo.mimetype.split('/')[1]
      const namePathlogo = `${nanoid(10)}.${extensionLogo}`
      const resImgPLogo = await uploadImgPrincipal(logo.data, namePathlogo)
      const imgAboutMe = req.files?.imgAboutMe
      const extensionAboutMe = logo.mimetype.split('/')[1]
      const namePathAboutMe = `${nanoid(10)}.${extensionAboutMe}`
      const resImgPAboutMe = await uploadImgPrincipal(imgAboutMe.data, namePathAboutMe)
      empresa.logo = {
        path:resImgPLogo.filePath,
        type:extensionLogo,
        url:resImgPLogo.url,
        name:resImgPLogo.name,
        fileId:resImgPLogo.fileId
      }
      empresa.imgAboutMe = {
        path:resImgPAboutMe.filePath,
        type:extensionAboutMe,
        url:resImgPAboutMe.url,
        name:resImgPAboutMe.name,
        fileId:resImgPAboutMe.fileId
      }
    }
    const newEmpresa = await empresa.save()
    return res.json({newEmpresa})
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