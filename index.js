import 'dotenv/config'
import './database/connectdb.js'
import express from "express";
import cors from 'cors'
import authRouters from './routes/auth_route.js'
import productsRouters from './routes/product_routes.js'
import usersRouters from './routes/usuarios_routes.js'
import codeRouters from './routes/code_routes.js'
import empresaRouters from './routes/aboutMe_routes.js'
import categoryRouters from './routes/category_routes.js'
import anuncioRouters from './routes/anuncios_routes.js'
import cookieParser from 'cookie-parser';
import fileUpload from 'express-fileupload';
const app = express()
app.disable('x-powered-by')
const whiteList = [process.env.ORIGIN1, process.env.ORIGIN2]
app.use(
  cors({
    origin:function (origin, callback) {
      if(whiteList.includes(origin) || !origin){
        return callback(null, origin)
      }
      return callback('Error de cors origin' + origin + "no autorizado")
    },
    credentials:true
  })
)
const PORT = process.env.PORT || 5000
//midelware
app.use(express.json())
app.use(cookieParser())
app.use(fileUpload({
  limits: { fileSize: 50 * 1024 * 1024 },
  /*useTempFiles : true,
  tempFileDir : './uploads'*/
}));
app.use('/api/v1/auth',authRouters)
app.use('/api/v1/products',productsRouters)
app.use('/api/v1/users',usersRouters)
app.use('/api/v1/codes',codeRouters)
app.use('/api/v1/empresa',empresaRouters)
app.use('/api/v1/category',categoryRouters)
app.use('/api/v1/anuncios',anuncioRouters)
app.use(express.static("public"));
//app.use(express.static("views/components"));


app.listen(PORT, () => console.log('http://localhost:' + PORT))