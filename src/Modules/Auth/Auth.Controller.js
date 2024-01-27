import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { customAlphabet } from "nanoid";
import { sendEmail } from "../../Services/Email.js";
import UserModel from "../../../DB/Model/User.Model.js";
import ManagerModel from "../../../DB/Model/Manager.Model.js";

const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Safety Warning</title>
    <style>
        body {
            font-family: 'Arial', sans-serif;
            background-color: #f5f5f5;
            color: #333;
            padding: 20px;
            text-align: center;
        }
        .warning {
            background-color: #fff;
            padding: 15px;
            border-radius: 10px;
            margin-top: 20px;
            color: #333; 
        }
        h2 {
            color: #f6110b; 
        }
        p {
            color: #92201c; 
        }
    </style>
</head>
<body>
<div class="warning">
<div style="background-color: red; padding: 20px;"></div>
<h2>Safety Warning</h2>
<p>The limit of login attempts on your account has been exceeded.</p>
<p>Please take the necessary measures to secure your account.</p>
<p>Thank you for your understanding and concern for the security of your account.</p>
<br>
<br>
</div>

</body>
</html>


`;

export const SignUp = async (req, res) => {
  const { userName, email, phone, address, age, password, confirmpassword } =
    req.body;
  const User = await UserModel.findOne({ email });
  if (User) {
    return res.status(404).json({ message: "email already exists" });
  }
  const hashedpassword = bcrypt.hashSync(
    password,
    parseInt(process.env.SALT_ROUND)
  );
  if (password !== confirmpassword) {
    return res.status(400).json({ message: "Passwords do not match" });
  }
  const token = jwt.sign({ email }, process.env.ConfirmEmailSecure);
  await sendEmail(
    email,
    "confirm email",
    `<a href="${req.protocol}://${req.headers.host}/auth/confirmEmail/${token}">Verfiy your email !!</a>`
  );
  const createUser = await UserModel.create({
    userName,
    email,
    phone,
    address,
    age,
    confirmpassword: true,
    password: hashedpassword,
  });
  return res.status(201).json({ message: "success", user: createUser });
};

export const SignIn = async (req, res, next) => {
  const { email, password } = req.body;

  let user = await ManagerModel.findOne({ email });
  console.log(user)

  if (!user) {
    user = await UserModel.findOne({ email });
  }


  if (!user) {
    return res.status(404).json({ message: "Invalid email" });
  }

  const match = bcrypt.compareSync(password, user.password);
  if (!match) {
    user.loginAttempts += 1;
    await user.save();
    if (user.loginAttempts >= 3) {
      await sendEmail(email, `Safety Warning`, html);
      return res
        .status(403)
        .json({ message: "The limit of login attempts has been exceeded" });
    }
    return res.status(404).json({ message: "data invaid password" });
  }
  user.loginAttempts = 0;
  await user.save();

  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.LOGINSINGURE,
    { expiresIn: "1h" }
  ); //عشان موضوع السيكورتي وما يصير في تعديل ع الداتا
  const refreshToken = jwt.sign(
    { id: user._id, role: user.role },
    process.env.LOGINSINGURE,
    { expiresIn: 60 * 60 * 24 * 30 }
  );
  return res.status(200).json({
    message: "success",
    token,
    refreshToken,
    id: user._id,
    role: user.role,
    name: user.userName,
    email: user.email,
    age: user.age,
    phone: user.phone,
    address: user.address,
  });
};

export const ConfirmEmail = async (req, res) => {
  const token = req.params.token;
  const decoded = jwt.verify(token, process.env.ConfirmEmailSecure);
  if (!decoded) {
    return res.status(404).json({ message: "invalid token" });
  }
  const user = await UserModel.findOneAndUpdate(
    { email: decoded.email, confirmEmail: false },
    { confirmEmail: true }
  );
  if (!user) {
    return res
      .status(400)
      .json({ message: "invalid verify your email or your email is verified" });
  }
  return res.status(200).json({ message: "your email is verified" });
};

export const SendCode = async (req, res) => {
  const { email } = req.body;
  let code = customAlphabet("1234567890", 4);
  code = code();
  const User = await UserModel.findOneAndUpdate(
    { email },
    { sendCode: code },
    { new: true }
  ); //من خلال  الايميل غيرلي الكود من نل للقيمة الجديدة وعدل البيانات
  if (!User) {
    return res.status(404).json({ message: "faild this user not found" });
  }
  const html = `<h2>code is : ${code} </h2>`;
  await sendEmail(email, `Resetpassword`, html);
  //return res.redirect(process.env.REDICTPAGE)
  return res.status(200).json({ message: "success", User });
};

export const forgetPassword = async (req, res) => {
  const { email, code, password, confirmpassword } = req.body;
  const user = await UserModel.findOne({ email });
  if (!user) {
    return res.status(404).json({ message: "email already exists" });
  }
  if (user.sendCode != code) {
    return res.status(400).json({ message: "invalid code" });
  }
  let match = await bcrypt.compare(password, user.password);
  if (match) {
    return res.status(409).json({ message: "same password" });
  }
  user.password = await bcrypt.hash(password, parseInt(process.env.SALT_ROUND));
  if (password !== confirmpassword) {
    return res.status(400).json({ message: "Passwords do not match" });
  }
  user.sendCode = null;
  await user.save();
  return res.status(200).json({ message: "success" });
};
