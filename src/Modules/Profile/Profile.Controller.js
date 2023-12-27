import UserModel from "../../../DB/Model/User.Model.js";

export const updateProfile = async (req, res) => {
  try {
    const { userName, age, phone, address } = req.body;


    const updatedProfile = await UserModel.findByIdAndUpdate(
      req.params.id,
      { userName, age, phone, address },
      { new: true }
    );

    if (updatedProfile) {
      res.status(200).json(updatedProfile);
    } else {
      res.status(404).json({ message: 'Profile not found' });
    }
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ error: 'Internal Server Error' }); 
  }
};
