import { validationResult, body } from "express-validator"

export const validationUser = (req, res, next) =>{
  const errors = validationResult(req)
  if(!errors.isEmpty()){
    return res.status(400).json({errors:errors.array()})
  }
  next()
}

export const validationLoginRegister = [
  body('email', 'Formato de correo incorrecto')
  .trim()
  .isEmail()
  .normalizeEmail(),
  body('password','Minimo 6 caracteres').isLength({min:6}),
  body('password','Máximo 12 caracteres').isLength({max:12}),
  validationUser
]
