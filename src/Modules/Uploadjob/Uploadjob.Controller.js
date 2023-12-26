import UploadjobModel from "../../../DB/Model/Uploadjob.Model.js"
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
    try {
      const jobs = await UploadjobModel.find();
      res.status(200).json(jobs);
    } catch (error) {
      res.status(500).json({ error: error.message });
    } 
  };