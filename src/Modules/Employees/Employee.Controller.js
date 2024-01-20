import EmployeeModel from "../../../DB/Model/Employee.Model.js";
import SalonModel from "../../../DB/Model/Salon.Model.js";
import cloudinary from '../../Services/Cloudinary.js'


export const createEmployee = async (req, res) => {
  try {
    const {secure_url, public_id} = await cloudinary.uploader.upload(req.file.path, {
        folder : `${process.env.APP_NAME}/employees`
    })
    
    const newEmployee = await EmployeeModel.create({...req.body, image: {secure_url, public_id}})
    
    res.status(201).json(newEmployee);
    
  } catch (error) {
    console.log(error);
    res.status(500).json({ error});
   

  }
};

export const getAllEmployees = async (req, res) => {
  const salonId = req.params.id;
  try {
    const salon = await SalonModel.findById(salonId);
    if (!salon) {
        return res.status(404).json({ message: "Salon not found" });
    }
    const employees = await EmployeeModel.find({SalonId: salonId});
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ error: error.message }); 
  }
};

export const getEmployeeById = async (req, res) => {
  try {
    const employee = await EmployeeModel.findById(req.params.id);
    if (employee) {
      res.status(200).json(employee);
    } else {
      res.status(404).json({ message: 'Employee not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateEmployee = async (req, res) => {
  try {
    const updatedEmployee = await EmployeeModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (updatedEmployee) {
      res.status(200).json(updatedEmployee);
    } else {
      res.status(404).json({ message: 'Employee not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteEmployee = async (req, res) => {
  try {
    const deletedEmployee = await EmployeeModel.findByIdAndDelete(
      req.params.id
    );
    if (deletedEmployee) {
      res.status(200).json(deletedEmployee);
    } else {
      res.status(404).json({ message: 'Employee not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
