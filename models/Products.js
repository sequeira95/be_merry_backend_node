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

const productSchema = new Schema({
  registrationDate:{
    type: Date,
    required: true
  },
  name:{
    type: String,
    required: true,
    //index: {unique: true}
  },
  description:{
    type: String,
    required: true,
  },
  price:{
    type: Number,
    required: true,
  },
  code:{
    type: Schema.Types.ObjectId,
    ref:"code",
    required: true,
  },
  category:{
    type: String,
    required: true
  },
  typeProduct:{
    type: String,
    required: true
  },
  quanty:{
    type: Number,
    required: false,
  },
  colors:{
    type: String,
    required: false,
  },
  size:{
    type: Array,
    required: false,
  },
  creadorId:{
    type: Schema.Types.ObjectId,
    ref:"user",
    required: true,
  },
  creadoPor:{
    type: String,
    required: false,
  },
  imgPrincipal:{
    type: imgSchema,
    default: {}
  },
  otherImg:[
    {
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
    }
  ]

})
export const Product = model('product', productSchema)