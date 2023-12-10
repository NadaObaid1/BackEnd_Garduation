import AppointmentModel from "../../../DB/Model/Appointment.Model.js";


export const createAppointment = async (req, res) => {
  try {
    const newAppointment = await AppointmentModel.create(req.body);
    res.status(201).json(newAppointment);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getAllAppointments = async (req, res) => {
  try {
    const appointments = await AppointmentModel.find();
    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAppointmentById = async (req, res) => {
  try {
    const appointment = await AppointmentModel.findById(req.params.id);
    if (appointment) {
      res.status(200).json(appointment);
    } else {
      res.status(404).json({ message: 'Appointment not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateAppointment = async (req, res) => {
  try {
    const updatedAppointment = await AppointmentModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (updatedAppointment) {
      res.status(200).json(updatedAppointment);
    } else {
      res.status(404).json({ message: 'Appointment not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteAppointment = async (req, res) => {
  try {
    const deletedAppointment = await AppointmentModel.findByIdAndDelete(
      req.params.id
    );
    if (deletedAppointment) {
      res.status(200).json(deletedAppointment);
    } else {
      res.status(404).json({ message: 'Appointment not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
