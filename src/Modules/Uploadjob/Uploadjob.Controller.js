import SalonModel from "../../../DB/Model/Salon.Model.js";

import UploadjobModel from "../../../DB/Model/Uploadjob.Model.js";
import multer from "multer";

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

export const createJob = async (req, res) => {
  try {
    upload.single("cvFile")(req, res, async (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "Error uploading file" });
      }

      const { user_name, jobName, SalonId } = req.body;
      const cvFileBuffer = req.file.buffer;

      const newJob = new UploadjobModel({
        user_name,
        jobName,
        cvFile: cvFileBuffer,
        SalonId,
      });

      const savedJob = await newJob.save();
      return res.status(201).json(savedJob);
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
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