import SalonModel from "../../../DB/Model/Salon.Model.js";
import cloudinary from '../../Services/Cloudinary.js'


export const createSalon = async (req, res) => {
  try {
    const {secure_url, public_id} = await cloudinary.uploader.upload(req.file.path, {
        folder : `${process.env.APP_NAME}/salons`
    })
    
    const newSalon = await SalonModel.create({...req.body, image: {secure_url, public_id}})
    
    res.status(201).json(newSalon);
    
  } catch (error) {
    console.log(error);
    res.status(500).json({ error});
   

  }
};

export const getAllSalons = async (req, res) => {
  try {
    const salons = await SalonModel.find();
    res.status(200).json(salons);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getSalonById = async (req, res) => {
  try {
    const salon = await SalonModel.findById(req.params.id);
    if (salon) {
      res.status(200).json(salon);
    } else {
      res.status(404).json({ message: 'Salon not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getSalon = async(req, res)=>{
  const Salon = await SalonModel.find().populate('Product')
  return res.status(200).json({message: "success", Salon})
}

export const updateSalon = async (req, res) => {
  try {
    const updatedSalon = await SalonModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (updatedSalon) {
      res.status(200).json(updatedSalon);
    } else {
      res.status(404).json({ message: 'Salon not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteSalon = async (req, res) => {
  try {
    const deletedSalon = await SalonModel.findByIdAndDelete(
      req.params.id
    );
    if (deletedSalon) {
      res.status(200).json(deletedSalon);
    } else {
      res.status(404).json({ message: 'Salon not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
