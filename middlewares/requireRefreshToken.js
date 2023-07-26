import { tokenVerificationErrors } from "../utils/generateToken.js"
import jwt from 'jsonwebtoken'

export const requireRefreshToken = (req, res, next) => {
  try {
    const refreshTokenCookie = req.cookies.refreshToken
    if(!refreshTokenCookie) throw new Error('No existe el token')
    const {uid} = jwt.verify(refreshTokenCookie, process.env.JWT_REFRESH)
    req.uid = uid
    next()
  } catch (e) {
    console.log(e)
    return  res.status(401).send({error:tokenVerificationErrors[e.message]})
  }
}