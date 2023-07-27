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

const categorySchema = new Schema({
  name:{
    type: String,
    required: true,
  },
  type:{
    type: String,
    required: true,
  },
  imagen:{
    type: imgSchema,
    default: {}
  },
  active:{
    type: Boolean
  }

})
export const Category = model('categoria', categorySchema)