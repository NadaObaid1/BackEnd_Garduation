import ServicesModel from "../../../DB/Model/Services.Model.js"; 
import cloudinary from '../../Services/Cloudinary.js'

export const getServices = async(req, res) => {
    const Services = await ServicesModel.find({isDeleted:false, status: 'Active',}).select('image name price time description finalPrice')
    //const Services = await ServicesModel.find({isDeleted:false})
    res.status(200).json({message:"success", Services})
}
export const getBodyServices = async(req, res) => {
    const Services = await ServicesModel.find({isDeleted:false, status: 'Active', subServices: 'Body'}).select('image name price time description finalPrice')
    res.status(200).json({message:"success", Services})
}

export const getFaceServices = async(req, res) => {
    const Services = await ServicesModel.find({isDeleted:false, status: 'Active', subServices: 'Face'}).select('image name price time description finalPrice')
    res.status(200).json({message:"success", Services})
}

export const CreateServices = async(req, res) => {
    const {name, description, price, discount, time} = req.body;
    let { subServices } = req.body;
    let { status } = req.body;

    if(await ServicesModel.findOne({name})){
        return res.status(409).json("Services Name is Exists")
    }
    req.body.finalPrice = price - (price * (discount || 0) / 100);

    const {secure_url, public_id} = await cloudinary.uploader.upload(req.file.path, {
        folder : `${process.env.APP_NAME}/services`
    })
    const service = await ServicesModel.create({name, description, price, discount, finalPrice: req.body.finalPrice, 
        subServices, status, time, image: {secure_url, public_id}})
    return res.status(201).json({message: "success", service})

}

export const updateServices = async(req, res)=>{
    try{
    const Services = await ServicesModel.findById(req.params.id);
    if(!Services) {
    return res.status(404).json({message: 'Services not found'});
    }
    if(req.body.name) {
    if(await ServicesModel.findOne({name:req.body.name}).select('name')){ // روح ع الداتابيس شوفهااذا موجود رجعلي بس اسمه
    return res.status(409).json({message: `Services ${req.body.name} already exists`})
    }
    Services.name = req.body.name;
    }
    if(req.body.price || req.body.discount) {// حطيتها ب If  لانه يمكن مش باعتها فبفحص بالاول
        Services.price = req.body.price; //يعني عدلي ع هاد الاوبجكت
        Services.discount = req.body.discount; 
        Services.finalPrice = Services.price - (Services.price * (Services.discount || 0) / 100);
    }
    if(req.body.description) {
        Services.description = req.body.description;
    }
    if(req.body.time) {
        Services.time = req.body.time;
    }
    if(req.body.status){
        Services.status = req.body.status
    }
    if(req.body.subServices){
        Services.subServices = req.body.subServices
    }
    if(req.file){
        const {secure_url, public_id} = await cloudinary.uploader.upload(req.file.path,{
            folder: `${process.env.APP_NAME}/services`
        })
        if (Services.image && Services.image.public_id) {
            await cloudinary.uploader.destroy(Services.image.public_id);
        }
        Services.image = { secure_url, public_id };
    }
    await Services.save();
    return res.status(200).json({message: "success", Services});
    }catch(err){
    return res.status(409).json({err: err.stack});
    }
}

export const softDelete = async(req, res)=>{ // ما بحذف حذف حقيقي 
    try{
        const {id} = req.params;
        const Service = await ServicesModel.findOneAndUpdate({_id:id, isDeleted:false}, {isDeleted: true}, 
        {new: true}); //رجعي المعلومات الجديدة
        if(!Service){ 
          return res.status(400).json({message: "can't delete this Service"});
        }
          return res.status(200).json({message: "success"});
    }catch(err){
          return res.status(200).json({err: "error where soft Delete"});
    }
}

export const restore = async(req, res)=>{ 
    const {id} = req.params;
    const Service = await ServicesModel.findOneAndUpdate({_id:id, isDeleted: true}, {isDeleted: false}, 
    {new: true}); 
    if(!Service){ 
      return res.status(400).json({message: "can't restore this Service"});
    }
    return res.status(200).json({message: "success"});
}

export const hardDelete = async(req, res)=>{ // بحذفه حذف نهائي
    const {id} = req.params;
    const Service = await ServicesModel.findOneAndDelete({_id:id})
    if(!Service){
        return res.status(400).json({message: "can't delete this Service"});
    }
    return res.status(200).json({message: "success"});
}