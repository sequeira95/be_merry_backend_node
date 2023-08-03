import {Schema, model} from "mongoose";
const imgSchema = new Schema({
  path:{
    type: String
  },
  type:{
    type: String
  },
  url:{
    type: String
  },
  name:{
    type: String
  },
  fileId:{
    type: String
  },

});

const anunciosSchema = new Schema({
  name:{
    type: String,
    required: true,
  },
  type:{
    type: String,
    required: true,
  },
  category:{
    type: String,
  },
  active:{
    type: Boolean
  },
  descripcion:{
    type: String
  },
  imagen:{
    type: imgSchema,
    default: {}
  },

})
export const Anuncios = model('anuncio', anunciosSchema)