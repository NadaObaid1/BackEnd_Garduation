import JobModel from "../../../DB/Model/Job.Model.js"
import cloudinary from '../../Services/Cloudinary.js'



export const createJob = async (req, res) => {
  try {
    const {secure_url, public_id} = await cloudinary.uploader.upload(req.file.path, {
        folder : `${process.env.APP_NAME}/jobs`
    })
    
    const newJob = await JobModel.create({...req.body, image: {secure_url, public_id}})
    
    res.status(201).json(newJob);
    
  } catch (error) {
    console.log(error);
    res.status(500).json({ error});
   

  }
};




export const getAllJobs = async (req, res) => {
    try {
      const jobs = await JobModel.find();
      res.status(200).json(jobs);
    } catch (error) {
      res.status(500).json({ error: error.message });
    } 
  };



  export const getJobById = async (req, res) => {
    try {
      const job = await JobModel.findById(req.params.id);
      if (job) {
        res.status(200).json(job);
      } else {
        res.status(404).json({ message: 'Job not found' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };


  export const updateJob = async (req, res) => {
    try {
      const updatedJob = await JobModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
      );
      if (updatedJob) {
        res.status(200).json(updatedJob);
      } else {
        res.status(404).json({ message: 'Job not found' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };


  export const deleteJob = async (req, res) => {
    try {
      const deletedJob = await JobModel.findByIdAndDelete(
        req.params.id
      );
      if (deletedJob) {
        res.status(200).json(deletedJob);
      } else {
        res.status(404).json({ message: 'Job not found' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }; 