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

const aboutMeSchema = new Schema({
  name:{
    type: String,
    required: true,
  },
  history:{
    type: String,
    required: true,
  },
  logo:{
    type: imgSchema,
    default: {}
  },

})
export const AboutMe = model('empresa', aboutMeSchema)