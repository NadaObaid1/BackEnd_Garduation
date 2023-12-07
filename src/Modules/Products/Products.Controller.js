import productModel from '../../../DB/Model/Product.model.js'
import cloudinary from '../../Services/Cloudinary.js'

export const getProducts = async (req, res) => {
    const products = await productModel.find({isDeleted:false}).select('name description finalPrice discount stock number_sellers rate status image')
    res.status(200).json({message:"success", products})
}

export const CreateProducts = async(req, res)=>{
    const {name, description, price, discount, stock, number_sellers, rate, status, subProducts} = req.body;

    req.body.finalPrice = price - (price * (discount || 0) / 100);

    if(await productModel.findOne({name})){
        return res.status(409).json("product Name is Exists")
    }

    const {secure_url, public_id} = await cloudinary.uploader.upload(req.file.path, {
        folder : `${process.env.APP_NAME}/products`
    })
    const product = await productModel.create({name, description, price, discount, stock,
          number_sellers, rate, status, image:{secure_url, public_id}, subProducts, finalPrice: req.body.finalPrice});
    if(!product){
        return res.status(400).json({message:"error while creating product"});
    }
    return res.status(201).json({message: "success", product});
}
export const hardDelete = async(req, res)=>{
    const {id} = req.params;
    const product = await productModel.findOneAndDelete({_id:id})
    if(!product){
        return res.status(400).json({message: "can't delete this product"});
    }
    return res.status(200).json({message: "success"});
}
