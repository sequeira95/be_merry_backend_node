import { Code } from '../models/codeProduct.js'
import { User } from '../models/User.js'

export const getCodes = async (req, res) => {
  try {
    const codes = await Code.find().lean()
    return res.json(codes)
  } catch (e) {
    console.log(e)
    return  res.status(500).json({error:'Error de servidor'}) 
  }
}
export const createCode = async (req, res) => {
  const {name, code, /*userId*/} = req.body

  try {
    //const user = await User.findOne({_id:userId}).lean()
    const codeSchema = new Code({
      name,
      code,
      codeName: `${code} - ${name}`,
      //creadorId:user._id,
      //creadoPor:user.name
    })
    console.log('creado',codeSchema)
    const newCode = await codeSchema.save()
    return res.json({newCode})
  } catch (e) {
    console.log(e)
    return  res.status(500).json({error:'Error de servidor'}) 
  }
}
export const updateCode = async (req, res) =>{
  const {_id, name, code} = req.body
  try {
    let updateCode = await Code.updateOne({_id},{
      name,
      code,
      codeName: `${code} - ${name}`
    })
    console.log(code)
    return res.status(200).json({updateCode})
  } catch (e) {
    console.log(e)
  }
}

export const deleteCode = async (req, res) => {
  const { _id } = req.body
  try {
    await Code.findByIdAndDelete(_id);
    return res.status(200).json({status:'ok'})
  } catch (e) {
    console.log(e)
  }
}