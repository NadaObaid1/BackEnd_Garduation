import NotificationModel from "../../../DB/Model/Notification.Model.js";
import SalonModel from "../../../DB/Model/Salon.Model.js";
import UserModel from "../../../DB/Model/User.Model.js";

export const createNotification = async (req, res) => {
  try {
    const { expoPushToken, title, body, data } = req.body;
    const newNotification = await NotificationModel.create({ expoPushToken, title, body, data });
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
