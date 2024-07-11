import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import axios from "axios";
import Spinner from "@/components/Spinner";
import {ReactSortable} from "react-sortablejs";

export default function ProductForm({
  _id,
  title:existingTitle,
  description:existingDescription,
  description1:existingDescription1,
  description2:existingDescription2,
  description3:existingDescription3,
  description4:existingDescription4,
  description5:existingDescription5,
  description6:existingDescription6,
  description7:existingDescription7,
  description8:existingDescription8,
  description9:existingDescription9,
  description10:existingDescription10,
  price:existingPrice,
  images:existingImages,
  category:assignedCategory,
  properties:assignedProperties,
}) {
  const [title,setTitle] = useState(existingTitle || '');
  const [description,setDescription] = useState(existingDescription || '');
  const [description1,setDescription1] = useState(existingDescription1 || '');
  const [description2,setDescription2] = useState(existingDescription2 || '');
  const [description3,setDescription3] = useState(existingDescription3 || '');
  const [description4,setDescription4] = useState(existingDescription4 || '');
  const [description5,setDescription5] = useState(existingDescription5 || '');
  const [description6,setDescription6] = useState(existingDescription6 || '');
  const [description7,setDescription7] = useState(existingDescription7 || '');
  const [description8,setDescription8] = useState(existingDescription8 || '');
  const [description9,setDescription9] = useState(existingDescription9 || '');
  const [description10,setDescription10] = useState(existingDescription10 || '');
  const [category,setCategory] = useState(assignedCategory || '');
  const [productProperties,setProductProperties] = useState(assignedProperties || {});
  const [price,setPrice] = useState(existingPrice || '');
  const [images,setImages] = useState(existingImages || []);
  const [goToProducts,setGoToProducts] = useState(false);
  const [isUploading,setIsUploading] = useState(false);
  const [categories,setCategories] = useState([]);
  const router = useRouter();
  useEffect(() => {
    axios.get('/api/categories').then(result => {
      setCategories(result.data);
    })
  }, []);
  async function saveProduct(ev) {
    ev.preventDefault();
    const data = {
      title,description,description1,description2,description3,description4,description5,description6
      ,description7,description8,description9,description10,price,images,category,
      properties:productProperties
    };
    if (_id) {
      //update
      await axios.put('/api/products', {...data,_id});
    } else {
      //create
      await axios.post('/api/products', data);
    }
    setGoToProducts(true);
  }
  if (goToProducts) {
    router.push('/products');
  }
  async function uploadImages(ev) {
    const files = ev.target?.files;
    if (files?.length > 0) {
      setIsUploading(true);
      const data = new FormData();
      for (const file of files) {
        data.append('file', file);
      }
      const res = await axios.post('/api/upload', data);
      setImages(oldImages => {
        return [...oldImages, ...res.data.links];
      });
      setIsUploading(false);
    }
  }
  function updateImagesOrder(images) {
    setImages(images);
  }
  function setProductProp(propName,value) {
    setProductProperties(prev => {
      const newProductProps = {...prev};
      newProductProps[propName] = value;
      return newProductProps;
    });
  }

  const propertiesToFill = [];
  if (categories.length > 0 && category) {
    let catInfo = categories.find(({_id}) => _id === category);
    propertiesToFill.push(...catInfo.properties);
    while(catInfo?.parent?._id) {
      const parentCat = categories.find(({_id}) => _id === catInfo?.parent?._id);
      propertiesToFill.push(...parentCat.properties);
      catInfo = parentCat;
    }
  }

  return (
      <form onSubmit={saveProduct}>
        <label>Product name</label>
        <input
          type="text"
          placeholder="product name"
          value={title}
          onChange={ev => setTitle(ev.target.value)}/>
        <label>Category</label>
        <select value={category}
                onChange={ev => setCategory(ev.target.value)}>
          <option value="">Uncategorized</option>
          {categories.length > 0 && categories.map(c => (
            <option key={c._id} value={c._id}>{c.name}</option>
          ))}
        </select>
        {propertiesToFill.length > 0 && propertiesToFill.map(p => (
          <div key={p.name} className="">
            <label>{p.name[0].toUpperCase()+p.name.substring(1)}</label>
            <div>
              <select value={productProperties[p.name]}
                      onChange={ev =>
                        setProductProp(p.name,ev.target.value)
                      }
              >
                {p.values.map(v => (
                  <option key={v} value={v}>{v}</option>
                ))}
              </select>
            </div>
          </div>
        ))}
        <label>
          Photos
        </label>
        <div className="mb-2 flex flex-wrap gap-1">
          <ReactSortable
            list={images}
            className="flex flex-wrap gap-1"
            setList={updateImagesOrder}>
            {!!images?.length && images.map(link => (
              <div key={link} className="h-24 bg-white p-4 shadow-sm rounded-sm border border-gray-200">
                <img src={link} alt="" className="rounded-lg"/>
              </div>
            ))}
          </ReactSortable>
          {isUploading && (
            <div className="h-24 flex items-center">
              <Spinner />
            </div>
          )}
          <label className="w-24 h-24 cursor-pointer text-center flex flex-col items-center justify-center text-sm gap-1 text-primary rounded-sm bg-white shadow-sm border border-primary">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
            </svg>
            <div>
              Add image
            </div>
            <input type="file" onChange={uploadImages} className="hidden"/>
          </label>
        </div>
        <label>Description</label>
        <textarea
          placeholder="description"
          value={description}
          onChange={ev => setDescription(ev.target.value)}
        />
          <label>Description 2</label>
        <textarea
          placeholder="small description"
          value={description1}
          onChange={ev => setDescription1(ev.target.value)}
        />
          <label>Description 3</label>
        <textarea
          placeholder="small description"
          value={description2}
          onChange={ev => setDescription2(ev.target.value)}
        />
        <label>Price (in USD)</label>
        <input
          type="number" placeholder="price"
          value={price}
          onChange={ev => setPrice(ev.target.value)}
        />
        <button
          type="submit"
          className="btn-primary">
          Save
        </button>
      </form>
  );
}
