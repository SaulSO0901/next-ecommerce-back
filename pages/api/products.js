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
     description1,description2,description3,description4,description5,description6,description7,
      description8,description9,description10,price,images,category,properties} = req.body;
    const productDoc = await Product.create({
      title,description,description1,description2,description3,description4,description5,description6,description7,
      description8,description9,description10,price,images,category,properties,
    })
    res.json(productDoc);
  }

  if (method === 'PUT') {
    const {title,description
    ,description1,description2,description3,description4,description5,description6,description7,
      description8,description9,description10,price,images,category,properties,_id} = req.body;
    await Product.updateOne({_id}, {title,description
      ,description1,description2,description3,description4,description5,description6,description7,
      description8,description9,description10,price,images,category,properties});
    res.json(true);
  }

  if (method === 'DELETE') {
    if (req.query?.id) {
      await Product.deleteOne({_id:req.query?.id});
      res.json(true);
    }
  }
}