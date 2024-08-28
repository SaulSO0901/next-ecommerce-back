import {Product} from "@/models/Product";
import {mongooseConnect} from "@/lib/mongoose";


export default async function handle(req, res) {
  const {method} = req;
  await mongooseConnect();


  if (method === 'GET') {
    if (req.query?.id) {
      res.json(await Product.findOne({_id:req.query.id}));
    } else {
      res.json(await Product.find());
    }
  }

  if (method === 'POST') {
    const {title,description,
    feature1,feature2,feature3,feature4,feature5,feature6,feature7,
    feature8,feature9,features1,features2,features3,features4,features5,price,images,category,properties} = req.body;
    const productDoc = await Product.create({
      title,description,feature1,feature2,feature3,feature4,feature5,feature6,feature7,
      feature8,feature9,features1,features2,features3,features4,features5,price,images,category,properties,
    })
    res.json(productDoc);
  }

  if (method === 'PUT') {
    const {title,description,
      feature1,feature2,feature3,feature4,feature5,feature6,feature7,
      feature8,feature9,features1,features2,features3,features4,features5,price,images,category,properties,_id} = req.body;
    await Product.updateOne({_id}, { title,description,feature1,feature2,feature3,feature4,feature5,feature6,feature7,
      feature8,feature9,features1,features2,features3,features4,features5,price,images,category,properties});
    res.json(true);
  }

  if (method === 'DELETE') {
    if (req.query?.id) {
      await Product.deleteOne({_id:req.query?.id});
      res.json(true);
    }
  }
}