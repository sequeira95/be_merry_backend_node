import {Schema, model} from "mongoose";

const codeSchema = new Schema({
  name:{
    type: String,
    required: true,
  },
  code:{
    type: String,
    required: true,
  },
  codeName:{
    type: String,
    required: false,
  },
  creadorId:{
    type: Schema.Types.ObjectId,
    ref:"user",
    required: false,
  },
  creadoPor:{
    type: String,
    required: false,
  }

})
export const Code = model('code', codeSchema)