import mongoose from "mongoose";
try{
  await mongoose.connect(process.env.URI)
  console.log('conectado 👍')
} catch (e){
  console.log('Error de conexion con mongo db: ' + e)
}