import User from "../modal/user.model.js";
import bcryptjs from "bcryptjs";

export const signup = async (req, res) => {
  try {
    const { fullname, email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User Already Exist" });
    }
    const hashPassword = await bcryptjs.hash(password, 10);
    const createdUser = new User({
      fullname: fullname,
      email: email,
      password: hashPassword
    });

    await createdUser.save();
    res.status(201).json({ message: "User Created Successfully" });

  } catch (error) {
    console.log("Error: " + error.message);
    res.status(500).json({ message: "Internal Server Error!" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid Username or Password" });
    }
    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid Username or Password" });
    } else {
      return res.status(200).json({
        message: "LogIn Successful",
        user: {
          _id: user._id,
          fullname: user.fullname,
          email: user.email
        }
      });
    }

  } catch (error) {
    console.log("Error: " + error.message);
    res.status(500).json({ message: "Internal Server Error!" });
  }
};
