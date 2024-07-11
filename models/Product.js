import mongoose, {model, Schema, models} from "mongoose";

const ProductSchema = new Schema({
  title: {type:String, required:true},
  description: String,
  description1: String,
  description2: String,
  description3: String,
  description4: String,
  description5: String,
  description6: String,
  description7: String,
  description8: String,
  description9: String,
  description10: String,
  price: {type: Number, required: true},
  images: [{type:String}],
  category: {type:mongoose.Types.ObjectId, ref:'Category'},
  properties: {type:Object},
}, {
  timestamps: true,
});

export const Product = models.Product || model('Product', ProductSchema);