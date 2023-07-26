import { User } from '../models/User.js'
import { generateRefreshToken, generateToken } from '../utils/generateToken.js'
import moment from 'moment/moment.js'


export const register = async (req, res) => {
  const {name, lastName, email, password} = req.body
  console.log(req.body)
  try{
    //buscamos usuario para confirmnar que no exista otro correo igual 
    let user = await User.findOne({email})
    if(user) return  res.status(400).json({error:'Este usuario ya se encuentra registrado'})
    user = new User({
      name, lastName, email, password, registrationDate: moment().toDate()
    })
    await user.save()
    const {token, expiresIn} = generateToken(user._id)
    generateRefreshToken(user._id, res)
    delete user.password
    return res.json({token, expiresIn, user})
  } catch (e){
    console.log(e)
    return  res.status(500).json({error:'Error de servidor'}) 
  }
}
export const login = async (req, res) => {
  const {email, password} = req.body
  try{
    let user = await User.findOne({email})
    if(!user) return  res.status(403).json({error:'Usuario o contraseña incorrecto'})
    const isValidPassword = await user.comparePassword(password)
    if(!isValidPassword) return res.status(403).json({error:'Usuario o contraseña incorrecto'})
    //generando token jwt
    const {token, expiresIn} = generateToken(user._id)
    delete user.password
    generateRefreshToken(user._id, res)
    user = {
      _id:user._id,
      name: user.name,
      lastName: user.lastName,
      email: user.email,
      isAdministrator: user?.isAdministrator,
      registrationDate: user?.registrationDate,
      codeVerification: user?.codeVerification,
      isVerified: user?.isVerified

    }
    return res.json({token,expiresIn,user})

  } catch (e){
    console.log(e)
    return  res.status(500).json({error:'Error de servidor'}) 
  }
  
}
export const refreshToken = async (req, res) => {
  try {
    let user = await User.findOne({_id:req.uid}).lean()
    const {token, expiresIn} = generateToken( req.uid )
    delete user.password
    return res.json({token,expiresIn, user})
  } catch (e) {
    console.log(e) 
    return  res.status(500).json({error:'Error de servidor'})     

  }
}
export const logout = (req, res) => {
  res.clearCookie('refreshToken')
  res.json({ok:'cerró sesión'})
}