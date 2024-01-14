import productModel from '../../../DB/Model/Product.model.js'
import SalonModel from '../../../DB/Model/Salon.Model.js'
import cloudinary from '../../Services/Cloudinary.js'

export const getProducts = async (req, res) => {
    const products = await productModel.find({isDeleted:false, status: 'Active'}).select('name description finalPrice discount stock number_sellers rate status image')
    res.status(200).json({message:"success", products})
}

export const getBodyProducts = async (req, res) => {
    const salonId = req.params.id;
    try {
        const salon = await SalonModel.findById(salonId);
        if (!salon) {
            return res.status(404).json({ message: "Salon not found" });
        }
        const products = await productModel.find({
            isDeleted: false,
            subProducts: 'Body',
            status: 'Active',
            SalonId: salonId,
        }).select('name description finalPrice discount stock number_sellers rate status image');

        res.status(200).json({ message: "Success", products });
    } catch (error) {
        console.error("Error fetching body products:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}


export const getFaceProducts = async (req, res) => {
    const salonId = req.params.id;
    try {
        const salon = await SalonModel.findById(salonId);
        if (!salon) {
            return res.status(404).json({ message: "Salon not found" });
        }
        const products = await productModel.find({
            isDeleted: false,
            subProducts: 'Face',
            status: 'Active',
            SalonId: salonId,
        }).select('name description finalPrice discount stock number_sellers rate status image');

        res.status(200).json({ message: "Success", products });
    } catch (error) {
        console.error("Error fetching body products:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const CreateProducts = async(req, res)=>{
    const {SalonId, name, description, price, discount, stock, number_sellers, rate, status, subProducts} = req.body;
    //return res.json({SalonId})
    req.body.finalPrice = price - (price * (discount || 0) / 100);

    if(await productModel.findOne({name})){
        return res.status(409).json("product Name is Exists")
    }
    const salon = await SalonModel.findById(SalonId);
    if (!salon) {
        return res.status(404).json({ message: "Salon not found" });
    }
    const {secure_url, public_id} = await cloudinary.uploader.upload(req.file.path, {
        folder : `${process.env.APP_NAME}/products`
    })
    const product = await productModel.create({SalonId, name, description, price, discount, stock,
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

export const softDelete = async(req, res)=>{ // ما بحذف حذف حقيقي 
    try{
        const {id} = req.params;
        const product = await productModel.findOneAndUpdate({_id:id, isDeleted:false}, {isDeleted: true}, 
        {new: true}); //رجعي المعلومات الجديدة
        if(!product){ 
          return res.status(400).json({message: "can't delete this product"});
        }
          return res.status(200).json({message: "success"});
    }catch(err){
          return res.status(200).json({err: "error where soft Delete"});
    }
}
