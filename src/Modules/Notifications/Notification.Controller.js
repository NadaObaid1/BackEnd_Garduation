import NotificationModel from "../../../DB/Model/Notification.Model.js";
import SalonModel from "../../../DB/Model/Salon.Model.js";
import UserModel from "../../../DB/Model/User.Model.js";

export const createNotification = async (req, res) => {
  try {
    const { expoPushToken, title, body, data, salonId, userId } = req.body;
    const newNotification = await NotificationModel.create({
      expoPushToken,
      title,
      body,
      data,
      salonId,
      userId,
    });
    res.status(201).json(newNotification);
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const getAllNotifications = async (req, res) => {
  try {
    const notifications = await NotificationModel.find();
    res.status(200).json(notifications);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getUserNotifications = async (req, res) => { 
  const userId = req.params.id;
  const salonId = req.params.Id;
  try {
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" }); 
    }
    const notifications = await NotificationModel.find({salonId: salonId, userId: userId,  toUser: true });
    res.status(200).json(notifications);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteNotification = async (req, res) => {
  try {
    const deletedNotif = await NotificationModel.findByIdAndDelete( 
      req.params.id
    );
    if (deletedNotif) {
      res.status(200).json(deletedNotif);
    } else {
      res.status(404).json({ message: 'Notification not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message }); 
  }
};

export const getSalonNotifications = async (req, res) => { 
  const salonId = req.params.id;
  try {
    const salon = await SalonModel.findById(salonId);
    if (!salon) {
      return res.status(404).json({ message: "Salon not found" }); 
    }
    const notifications = await NotificationModel.find({ salonId: salonId, toUser: false });
    res.status(200).json(notifications);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
