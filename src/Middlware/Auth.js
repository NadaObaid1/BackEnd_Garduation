import jwt from "jsonwebtoken";
import userModel from "../../DB/Model/User.Model.js";
import ManagerModel from "../../DB/Model/Manager.Model.js";

export const roles = {
  Admin: "Admin",
  User: "User",
  Manager: "Manager",
};

export const auth = (accessRole = []) => {
  return async (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization?.startsWith(process.env.BEARERKEY)) {
      return res.status(400).json({ message: "Invalid authorization" });
    }
    const token = authorization.split(process.env.BEARERKEY)[1]; //splitحولي اياه لاري وقص من عند البيررر كي
    const decoded = jwt.verify(token, process.env.LOGINSINGURE); //بواسطة ال jwt
    if (!decoded) {
      return res.status(400).json({ message: "Invalid authorization" });
    }

    let user = await userModel.findById(decoded.id).select("userName role");
    if (!user) {
      user = await ManagerModel.findById(decoded.id).select("userName role");
      if (!user) {
        return res.status(404).json({ message: "not registerd user" });
      }
    }

    if (!accessRole.includes(user.role)) {
      return res.status(403).json({ message: "not auth user" });
    }
    req.user = user;
    next();
  };
};
