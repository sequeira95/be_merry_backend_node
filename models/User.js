import {Schema, model} from "mongoose";
import bcryptjs from 'bcryptjs'

const userSchema = new Schema({
  name:{
    type: String,
    required: true,
  },
  lastName:{
    type: String,
    required: true,
  },
  password:{
    type: String,
    required: true
  },
  email:{
    type: String,
    required: true,
    unique:true,
    lowercase:true,
    trim:true
  },
  isAdministrator:{
    type: Boolean,
    required:false,
  },
  registrationDate:{
    type: Date,
    required: false
  },
  codeVerification:{
    type: String,
    required:false
  },
  isVerified:{
    type: Boolean,
    require:false
  }
})

userSchema.pre('save', async function(next){
  const user = this
  if(!user.isModified('password')) return next()
  try{
    const salt = await bcryptjs.genSalt(10)
    user.password = await bcryptjs.hash(user.password, salt)
    next()
  } catch (e){
    console.Console.log(e)
    throw new Error('Fallo hash de contraseña')
  }
})
userSchema.methods.comparePassword = async function(candidatePassword){
  return await bcryptjs.compare(candidatePassword, this.password)
}
export const User = model('user', userSchema)