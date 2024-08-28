import mongoose, {model, Schema, models} from "mongoose";

const ProductSchema = new Schema({
  title: {type:String, required:true},
  description: String,
  feature1: String,
  feature2: String,
  feature3: String,
  feature4: String,
  feature5: String,
  feature6: String,
  feature7: String,
  feature8: String,
  feature9: String,
  features1: String,
  features2: String,
  features3: String,
  features4: String,
  features5: String,
  price: {type: Number, required: true},
  images: [{type:String}],
  category: {type:mongoose.Types.ObjectId, ref:'Category'},
  properties: {type:Object},
}, {
  timestamps: true,
});

export const Product = models.Product || model('Product', ProductSchema);