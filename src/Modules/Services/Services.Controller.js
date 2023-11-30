import ServicesModel from "../../../DB/Model/Services.Model.js"; 
import cloudinary from '../../Services/Cloudinary.js'

export const getServices = (req, res) => {
    return res.json("hh")
}

export const CreateServices = async(req, res) => {
    try{
    const {name, description, price, discount, time} = req.body;

    if(await ServicesModel.findOne({name})){
        return res.status(409).json("Services Name is Exists")
    }
    const {secure_url, public_id} = await cloudinary.uploader.upload(req.file.path, {
        folder : `${process.env.APP_NAME}/services`
    })
    const service = await ServicesModel.create({name, description, price, discount, time, image: {secure_url, public_id}})
    return res.status(201).json({message: "success", service})

    }catch (error) {
    return res.status(500).json({ message: "An error occurred while creating the services", error});
    }
}