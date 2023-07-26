import { User } from "../models/User.js"
import { nanoid } from 'nanoid'
import nodemailer from 'nodemailer'
import moment from "moment"
export const getUsers = async (req, res) => {
  try {
    const users = await User.find()
    return res.json({users})
  } catch (e) {
    console.log(e)
    return  res.status(500).json({error:'Error de servidor'}) 
  }
}

export const createUserAdministrator = async (req, res) => {
  const {name, lastName, email, isAdministrator} = req.body
  console.log('body', req.body)
  try {
    let user = await User.findOne({email}).lean()
    if(user) return  res.status(400).json({error:'Este usuario ya se encuentra registrado'})
    const passwordGenerate = nanoid(6)
    user = new User({
      name, 
      lastName, 
      email, 
      password:passwordGenerate, 
      registrationDate: moment().toDate(),
      isVerified:true,
      isAdministrator: isAdministrator || false
    })
    //Envio de correo con la contraseña generada
    /*const  transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: process.env.userEmail,
        pass: process.env.passwordEmail
      }
    })
    
    await transport.sendMail({
      from: '"Fred Foo 👻" <foo@example.com>',
      to: user.email,
      subject: "verifique cuenta de correo",
      html: `
      <p>Correo: ${user.email}</p>
      <p>Contraseña: ${user.password}</p>
      `,
  })*/
    //prueba envio de gmail
    const  transport = nodemailer.createTransport({
      service:'gmail',
      auth: {
        user: process.env.userEmailpruebaGmail,
        pass: process.env.passwordEmailpruebaGmail
      }
    })
    await transport.sendMail({
      from: '"Fred Foo 👻" <pruebaenviocorreonode@gmail.com>',
      to: user.email,
      subject: "verifique cuenta de correo",
      html: `
      <p>Correo: ${user.email}</p>
      <p>Contraseña: ${user.password}</p>
      `,
  })
  
  //await user.save()
  return res.status(200).json({user})
  } catch (e) {
    console.log(e)
  }
}

export const updateUser = async (req, res) =>{
  const dataUser = req.body
  console.log('body', dataUser)
  try {
    let user = await User.findOne({_id: dataUser._id})
    console.log(user)
    user.name = dataUser.name,
    user.lastName = dataUser.lastName,
    user.email = dataUser.email,
    user.isAdministrator = dataUser.isAdministrator
    await user.save()
    return res.status(200).json({user})
  } catch (e) {
    console.log(e)
  }
}

export const deleteUser = async (req, res) => {
  const { _id } = req.body
  try {
    await User.findByIdAndDelete(_id);
    return res.status(200).json({status:'ok'})
  } catch (e) {
    console.log(e)
  }
}