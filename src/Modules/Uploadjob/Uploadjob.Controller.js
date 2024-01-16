import UploadjobModel from "../../../DB/Model/Uploadjob.Model.js"
import SalonModel from "../../../DB/Model/Salon.Model.js";
import cloudinary from '../../Services/Cloudinary.js'

export const uploadJob = async (req, res) => { 
    try {
      const {secure_url, public_id} = await cloudinary.uploader.upload(req.file.path, {
          folder : `${process.env.APP_NAME}/uploadjobs`
      })
      
      const newJob = await UploadjobModel.create({...req.body, image: {secure_url, public_id}})
      
      res.status(201).json(newJob);
      
    } catch (error) {
      console.log(error);
      res.status(500).json({ error});
     
  
    } 
  };

 
  export const getAllJobs = async (req, res) => {
    const salonId = req.params.id;
    try {
      const salon = await SalonModel.findById(salonId);
      if (!salon) {
          return res.status(404).json({ message: "Salon not found" });
      }
      const jobs = await UploadjobModel.find({SalonId: salonId});
      res.status(200).json(jobs);
    } catch (error) {
      res.status(500).json({ error: error.message });
    } 
  };